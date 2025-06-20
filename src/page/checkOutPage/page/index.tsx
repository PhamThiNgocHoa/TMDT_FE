import React, {useState, useEffect, useMemo} from 'react';
import CustomerForm from '../components/CustomerForm';
import CartItems from '../components/CartItems';
import OrderSummary from '../components/OrderSummary';
import PaymentMethods from '../components/PaymentMethods';
import CouponForm from '../components/CouponForm';
import CheckoutButton from '../components/CheckoutButton';
import Notification from '../components/Notification';
import CheckoutSuccess from '../CheckoutSuccess';
import CheckoutFailure from '../CheckoutFailure';
import styles from './index.module.css';

import {AddressRequest} from "../../../models/request/AddressRequest";
import {OrderMethod} from "../../../enums/OrderMethod";
import useCustomer from "../../../hooks/useCustomer";
import useCart from "../../../hooks/useCart";
import useOrder from "../../../hooks/useOrder";

const CheckoutPage: React.FC = () => {
    const {user} = useCustomer();
    const userId = useMemo(() => user?.id ?? 0, [user?.id]);
    const {cartData} = useCart(userId);

    const [customerInfo, setCustomerInfo] = useState<AddressRequest>({
        receiver: '',
        address: '',
        numberPhone: '',
        customerId: userId,
    });

    const [availablePaymentMethods, setAvailablePaymentMethods] = useState<OrderMethod[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<OrderMethod>(OrderMethod.COD);
    const [couponDiscount, setCouponDiscount] = useState<number>(0);
    const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failure'>('idle');
    const {fetchCreateOrderAndPayment} = useOrder();
    const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
    const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);

    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: 'success' as 'success' | 'error',
    });

    useEffect(() => {
        setAvailablePaymentMethods([
            OrderMethod.COD,
            OrderMethod.VN_PAY,
        ]);
    }, []);


    const handleCustomerInfoChange = (info: AddressRequest) => {
        setCustomerInfo(info);
    };

    const handleSelectPaymentMethod = (method: OrderMethod) => {
        setSelectedPaymentMethod(method);
    };

    const handleApplyCoupon = async (code: string) => {
        setIsApplyingCoupon(true);
        try {
            const discount = code === 'GIAM10' ? 10 : 0;
            if (discount > 0) {
                setCouponDiscount(discount);
                showNotification('Mã giảm giá đã được áp dụng thành công!', 'success');
            } else {
                showNotification('Mã giảm giá không hợp lệ.', 'error');
            }
        } catch (e) {
            showNotification('Lỗi khi áp dụng mã giảm giá.', 'error');
        } finally {
            setIsApplyingCoupon(false);
        }
    };

    const handleSubmitOrder = async () => {
        if (!validateForm()) {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc.', 'error');
            return;
        }

        setIsSubmittingOrder(true);
        setPaymentStatus('idle');

        try {
            await fetchCreateOrderAndPayment(
                {
                    orderDetails: cartData?.cartItems.map(item => ({
                        productId: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price,
                    })) ?? [],
                    address: customerInfo.address,
                    receiver: customerInfo.receiver,
                    numberPhone: customerInfo.numberPhone,
                    customerId: userId
                },
                selectedPaymentMethod
            );

            setPaymentStatus('success');
        } catch (error) {
            console.error("Đặt hàng thất bại:", error);
            setPaymentStatus('failure');
        } finally {
            setIsSubmittingOrder(false);
        }
    };


    const validateForm = (): boolean => {
        const {receiver, address, numberPhone} = customerInfo;
        return !!(receiver && address && numberPhone);
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({show: true, message, type});
    };

    const hideNotification = () => {
        setNotification(prev => ({...prev, show: false}));
    };

    return (
        <main className={styles.checkoutContainer}>
            {notification.show && paymentStatus === 'idle' && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={hideNotification}
                />
            )}

            {paymentStatus === 'success' && <CheckoutSuccess/>}
            {paymentStatus === 'failure' && <CheckoutFailure/>}

            {paymentStatus === 'idle' && (
                <div className={styles.checkoutContent}>
                    <section className={styles.leftColumn}>
                        <CustomerForm
                            customerInfo={customerInfo}
                            onCustomerInfoChange={handleCustomerInfoChange}
                        />
                    </section>

                    <section className={styles.rightColumn}>
                        <>
                            <CartItems items={cartData}/>

                            <OrderSummary
                                items={cartData}
                            />

                            <PaymentMethods
                                paymentMethods={availablePaymentMethods}
                                selectedMethod={selectedPaymentMethod}
                                onSelectPaymentMethod={handleSelectPaymentMethod}
                            />

                            <CouponForm
                                onApplyCoupon={handleApplyCoupon}
                                isLoading={isApplyingCoupon}
                            />

                            <CheckoutButton
                                onClick={handleSubmitOrder}
                                isLoading={isSubmittingOrder}
                            />
                        </>
                    </section>
                </div>
            )}
        </main>
    );
};

export default CheckoutPage;
