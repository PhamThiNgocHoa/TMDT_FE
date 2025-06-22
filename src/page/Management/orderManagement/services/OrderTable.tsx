"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../OrderManagement.module.css';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { OrderStatus, OrderStatusDisplayName } from '../../../../enums/OrderStatus';

interface OrderDetail {
    id: number;
    fullname: string;
    address: string;
    phone: string;
    status: string;
    totalAmount?: number;
    orderDate?: string;
    customerDTO?: {
        fullname: string;
        email: string;
        phone: string;
    };
    orderDetails?: Array<{
        id: number;
        quantity: number;
        color?: string;
        productResponseDTO?: {
            id: number;
            name: string;
            price: number;
            img?: string;
            description?: string;
        };
        // Fallback fields for backward compatibility
        productName?: string;
        product_name?: string;
        name?: string;
        productDTO?: {
            name?: string;
            productName?: string;
        };
        amount?: number;
        price?: number;
        unitPrice?: number;
        unit_price?: number;
        totalPrice?: number;
        total_price?: number;
        totalAmount?: number;
        total_amount?: number;
    }>;
}

export const OrderTable: React.FC = () => {
    const {
        orders,
        loading,
        error,
        fetchOrders,
        deleteOrder,
        selectedOrders,
        setSelectedOrders
    } = useOrders();

    const navigate = useNavigate();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [orderToDeleteId, setOrderToDeleteId] = useState<string | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail | null>(null);
    const [viewModalLoading, setViewModalLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (showViewModal) {
                    handleCloseViewModal();
                }
                if (showDeleteConfirm) {
                    handleCancelDelete();
                }
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [showViewModal, showDeleteConfirm]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOrders(
            e.target.checked ? orders.map(o => o.id.toString()) : []
        );
    };

    const handleSelectOrder = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const isAllSelected = useMemo(
        () => orders.length > 0 && selectedOrders.length === orders.length,
        [orders, selectedOrders]
    );

    const isIndeterminate = useMemo(
        () => selectedOrders.length > 0 && selectedOrders.length < orders.length,
        [orders, selectedOrders]
    );

    const handleEditClick = (order: { id: number }) => {
        navigate(`/management/orderManagement/edit/${order.id}`);
    };

    const handleViewOrder = async (order: any) => {
        try {
            setViewModalLoading(true);
            setShowViewModal(true);
            
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Bạn chưa đăng nhập');
            }

            console.log("🔍 Đang tải chi tiết đơn hàng ID:", order.id);
            
            // Gọi API để lấy chi tiết đơn hàng bao gồm sản phẩm
            const response = await axios.get(`/api/order-detail/orderId/${order.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("📦 Response từ API order-detail:", response.data);
            console.log("📦 Response type:", typeof response.data);
            console.log("📦 Is Array:", Array.isArray(response.data));
            if (Array.isArray(response.data) && response.data.length > 0) {
                console.log("📦 First item structure:", response.data[0]);
                console.log("📦 First item keys:", Object.keys(response.data[0]));
            } else if (response.data && typeof response.data === 'object') {
                console.log("📦 Object keys:", Object.keys(response.data));
                if (response.data.data) {
                    console.log("📦 Data structure:", response.data.data);
                    if (Array.isArray(response.data.data) && response.data.data.length > 0) {
                        console.log("📦 First data item:", response.data.data[0]);
                        console.log("📦 First data item keys:", Object.keys(response.data.data[0]));
                    }
                }
            }

            // Xử lý response structure - API có thể trả về Array hoặc Object
            let orderDetails = [];
            if (Array.isArray(response.data)) {
                // Nếu response là Array, sử dụng trực tiếp
                orderDetails = response.data;
            } else if (response.data?.data) {
                // Nếu response có cấu trúc {data: [...]}
                orderDetails = Array.isArray(response.data.data) ? response.data.data : [];
            } else if (response.data?.orderDetails) {
                // Nếu response có cấu trúc {orderDetails: [...]}
                orderDetails = Array.isArray(response.data.orderDetails) ? response.data.orderDetails : [];
            }
            
            console.log("📦 Processed orderDetails:", orderDetails);
            if (orderDetails.length > 0) {
                console.log("📦 First processed item:", orderDetails[0]);
                console.log("📦 Available fields:", Object.keys(orderDetails[0]));
                console.log("📦 Product name test:", getProductName(orderDetails[0]));
                console.log("📦 Product quantity test:", getProductQuantity(orderDetails[0]));
                console.log("📦 Product price test:", getProductPrice(orderDetails[0]));
                console.log("📦 Product total test:", getProductTotal(orderDetails[0]));
            }

            setSelectedOrderDetail({
                id: order.id,
                fullname: order.fullname,
                address: order.address,
                phone: order.phone,
                status: order.status,
                totalAmount: order.totalAmount,
                orderDate: order.orderDate,
                customerDTO: order.customerDTO,
                orderDetails: orderDetails
            });

            console.log("✅ Đã load chi tiết đơn hàng thành công:", orderDetails);

        } catch (error: any) {
            console.error('Error loading order details:', error);
            
            // Fallback: sử dụng dữ liệu cơ bản nếu API lỗi
            setSelectedOrderDetail({
                id: order.id,
                fullname: order.fullname,
                address: order.address,
                phone: order.phone,
                status: order.status,
                totalAmount: order.totalAmount,
                orderDate: order.orderDate,
                customerDTO: order.customerDTO,
                orderDetails: []
            });

            // Hiển thị thông báo lỗi nhẹ
            if (error.response?.status !== 404) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Không thể tải chi tiết sản phẩm',
                    text: 'Đang hiển thị thông tin cơ bản của đơn hàng.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } finally {
            setViewModalLoading(false);
        }
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSelectedOrderDetail(null);
    };

    const handleModalOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseViewModal();
        }
    };

    const handleShowDeleteConfirm = (id: string) => {
        const order = orders.find(o => o.id.toString() === id);
        if (!order) return;

        if (!canDeleteOrder(order.status)) {
            Swal.fire({
                icon: 'warning',
                title: 'Không thể xóa đơn hàng',
                text: 'Chỉ có thể xóa đơn hàng ở trạng thái "Đang chờ xử lý", "Đang chờ thanh toán", "Thanh toán thất bại" hoặc "Đã hủy"',
            });
            return;
        }

        setOrderToDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const handleCancelDelete = () => {
        setOrderToDeleteId(null);
        setShowDeleteConfirm(false);
    };

    const handleConfirmDelete = () => {
        if (orderToDeleteId) {
            const order = orders.find(o => o.id.toString() === orderToDeleteId);
            if (order && canDeleteOrder(order.status)) {
                deleteOrder(orderToDeleteId);
            }
            setOrderToDeleteId(null);
            setShowDeleteConfirm(false);
        }
    };

    const statusLabel = (status: string) => {
        return OrderStatusDisplayName[status as OrderStatus] || status;
    };

    const canDeleteOrder = (status: string) => {
        // Chỉ có thể xóa đơn hàng ở các trạng thái: PENDING_PAYMENT, PENDING, PAYMENT_FAILED, CANCELLED
        return [OrderStatus.PENDING_PAYMENT, OrderStatus.PENDING, OrderStatus.PAYMENT_FAILED, OrderStatus.CANCELLED].includes(status as OrderStatus);
    };

    const canEditOrder = (status: string) => {
        // Chỉ có thể chỉnh sửa đơn hàng ở các trạng thái: PENDING_PAYMENT, PENDING, PAYMENT_FAILED
        return [OrderStatus.PENDING_PAYMENT, OrderStatus.PENDING, OrderStatus.PAYMENT_FAILED].includes(status as OrderStatus);
    };

    const formatCurrency = (value: any): string => {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        return Number(value).toLocaleString();
    };

    const getProductName = (product: any): string => {
        // Ưu tiên lấy từ productResponseDTO trước
        if (product.productResponseDTO?.name) {
            return product.productResponseDTO.name;
        }
        
        // Fallback cho các trường hợp khác
        return product.productName || 
               product.product_name || 
               product.name || 
               product.productDTO?.name ||
               product.productDTO?.productName ||
               'N/A';
    };

    const getProductQuantity = (product: any): number => {
        return product.quantity || product.amount || 0;
    };

    const getProductPrice = (product: any): number => {
        // Ưu tiên lấy từ productResponseDTO trước
        if (product.productResponseDTO?.price) {
            return product.productResponseDTO.price;
        }
        
        // Fallback cho các trường hợp khác
        return product.price || product.unitPrice || product.unit_price || 0;
    };

    const getProductTotal = (product: any): number => {
        // Tính toán từ quantity và price nếu có productResponseDTO
        if (product.productResponseDTO?.price && product.quantity) {
            return product.productResponseDTO.price * product.quantity;
        }
        
        // Fallback cho các trường hợp khác
        return product.totalPrice || 
               product.total_price || 
               product.totalAmount || 
               product.total_amount || 
               product.amount || 0;
    };

    const getProductImage = (product: any): string => {
        // Lấy hình ảnh từ productResponseDTO
        if (product.productResponseDTO?.img) {
            return product.productResponseDTO.img;
        }
        
        // Fallback cho các trường hợp khác
        return product.img || product.image || product.productImage || '';
    };

    const handleBulkDelete = () => {
        const deletableOrders = selectedOrders.filter(id => {
            const order = orders.find(o => o.id.toString() === id);
            return order && canDeleteOrder(order.status);
        });

        const nonDeletableOrders = selectedOrders.filter(id => {
            const order = orders.find(o => o.id.toString() === id);
            return order && !canDeleteOrder(order.status);
        });

        if (nonDeletableOrders.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Một số đơn hàng không thể xóa',
                text: `Chỉ có thể xóa đơn hàng ở trạng thái "Đang chờ xử lý", "Đang chờ thanh toán", "Thanh toán thất bại" hoặc "Đã hủy". ${nonDeletableOrders.length} đơn hàng sẽ được bỏ qua.`,
            });
        }

        if (deletableOrders.length > 0) {
            Swal.fire({
                title: `Xóa ${deletableOrders.length} đơn hàng?`,
                text: 'Hành động này không thể hoàn tác.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
            }).then((result) => {
                if (result.isConfirmed) {
                    deletableOrders.forEach(id => deleteOrder(id));
                }
            });
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.tableContainer}>
            {selectedOrders.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>Đã chọn {selectedOrders.length} mục</span>
                    <button className={styles.deleteSelectedBtn} onClick={handleBulkDelete}>
                        <i className="fas fa-trash"></i> Xóa đã chọn
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            ref={input => {
                                if (input) input.indeterminate = isIndeterminate;
                            }}
                        />
                    </th>
                    <th>Khách hàng</th>
                    <th>Địa chỉ</th>
                    <th>SĐT</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 && !loading && (
                    <tr>
                        <td colSpan={6} className={styles.noData}>Không có dữ liệu.</td>
                    </tr>
                )}
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedOrders.includes(order.id.toString())}
                                onChange={() => handleSelectOrder(order.id.toString())}
                            />
                        </td>
                        <td>{order.fullname}</td>
                        <td>{order.address}</td>
                        <td>{order.phone}</td>
                        <td>
                                <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                                    {statusLabel(order.status)}
                                </span>
                        </td>
                        <td>
                            <div className={styles.actions}>
                                <button 
                                    className={`${styles.editBtn} ${!canEditOrder(order.status) ? styles.editBtnDisabled : ''}`} 
                                    onClick={() => canEditOrder(order.status) ? handleEditClick(order) : null}
                                    title={!canEditOrder(order.status) ? 'Chỉ có thể chỉnh sửa đơn hàng ở trạng thái "Đang chờ xử lý", "Đang chờ thanh toán" hoặc "Thanh toán thất bại"' : 'Chỉnh sửa đơn hàng'}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button className={styles.viewBtn} onClick={() => handleViewOrder(order)}>
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button 
                                    className={`${styles.deleteBtn} ${!canDeleteOrder(order.status) ? styles.deleteBtnDisabled : ''}`}
                                    onClick={() => handleShowDeleteConfirm(order.id.toString())}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showDeleteConfirm && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h3>Xóa đơn hàng?</h3>
                        <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                        <div className={styles.modalActions}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancelDelete}>Hủy</button>
                            <button className={`${styles.button} ${styles.primaryButton} ${styles.deleteButton}`} onClick={handleConfirmDelete}>Xóa</button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Order Modal */}
            {showViewModal && (
                <div className={styles.modalOverlay} onClick={handleModalOverlayClick}>
                    <div className={styles.viewModalContent}>
                        <div className={styles.modalHeader}>
                            <h3>
                                {viewModalLoading ? 'Đang tải...' : `Chi tiết đơn hàng #${selectedOrderDetail?.id}`}
                            </h3>
                            <button className={styles.closeButton} onClick={handleCloseViewModal}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        {viewModalLoading ? (
                            <div className={styles.modalBody}>
                                <div className={styles.loadingContainer}>
                                    <div className={styles.loadingSpinner}></div>
                                    <p>Đang tải thông tin đơn hàng...</p>
                                </div>
                            </div>
                        ) : selectedOrderDetail ? (
                            <>
                                <div className={styles.modalBody}>
                                    <div className={styles.orderInfoGrid}>
                                        <div className={styles.infoSection}>
                                            <h4>Thông tin khách hàng</h4>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Họ tên:</span>
                                                <span className={styles.infoValue}>{selectedOrderDetail.fullname}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Số điện thoại:</span>
                                                <span className={styles.infoValue}>{selectedOrderDetail.phone}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Địa chỉ:</span>
                                                <span className={styles.infoValue}>{selectedOrderDetail.address}</span>
                                            </div>
                                            {selectedOrderDetail.customerDTO && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.infoLabel}>Email:</span>
                                                    <span className={styles.infoValue}>{selectedOrderDetail.customerDTO.email}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className={styles.infoSection}>
                                            <h4>Thông tin đơn hàng</h4>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Mã đơn hàng:</span>
                                                <span className={styles.infoValue}>#{selectedOrderDetail.id}</span>
                                            </div>
                                            <div className={styles.infoRow}>
                                                <span className={styles.infoLabel}>Trạng thái:</span>
                                                <span className={`${styles.status} ${styles[selectedOrderDetail.status.toLowerCase()]}`}>
                                                    {statusLabel(selectedOrderDetail.status)}
                                                </span>
                                            </div>
                                            {selectedOrderDetail.totalAmount && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.infoLabel}>Tổng tiền:</span>
                                                    <span className={styles.infoValue}>
                                                        {formatCurrency(selectedOrderDetail.totalAmount)} ₫
                                                    </span>
                                                </div>
                                            )}
                                            {selectedOrderDetail.orderDate && (
                                                <div className={styles.infoRow}>
                                                    <span className={styles.infoLabel}>Ngày đặt:</span>
                                                    <span className={styles.infoValue}>
                                                        {new Date(selectedOrderDetail.orderDate).toLocaleDateString('vi-VN')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Danh sách sản phẩm */}
                                    <div className={styles.productsSection}>
                                        <h4>Danh sách sản phẩm</h4>
                                        {selectedOrderDetail.orderDetails && selectedOrderDetail.orderDetails.length > 0 ? (
                                            <div className={styles.productsTable}>
                                                <table className={styles.productsTableInner}>
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th>Đơn giá</th>
                                                            <th>Thành tiền</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {selectedOrderDetail.orderDetails.map((product, index) => {
                                                            const productName = getProductName(product);
                                                            const quantity = getProductQuantity(product);
                                                            const price = getProductPrice(product);
                                                            const total = getProductTotal(product);
                                                            const productImage = getProductImage(product);
                                                            
                                                            // Debug logging for each product
                                                            console.log(`📦 Product ${index + 1}:`, {
                                                                raw: product,
                                                                name: productName,
                                                                quantity,
                                                                price,
                                                                total,
                                                                image: productImage,
                                                                productResponseDTO: product.productResponseDTO
                                                            });
                                                            
                                                            return (
                                                                <tr key={product.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td className={styles.productName}>
                                                                        <div className={styles.productInfo}>
                                                                            {productImage && (
                                                                                <img 
                                                                                    src={productImage} 
                                                                                    alt={productName}
                                                                                    className={styles.productImage}
                                                                                    onError={(e) => {
                                                                                        e.currentTarget.style.display = 'none';
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            <div className={styles.productDetails}>
                                                                                <span className={styles.productTitle}>{productName}</span>
                                                                                {product.color && (
                                                                                    <span className={styles.productColor}>Màu: {product.color}</span>
                                                                                )}
                                                                                {product.productResponseDTO?.id && (
                                                                                    <span className={styles.productId}>ID: {product.productResponseDTO.id}</span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>{quantity}</td>
                                                                    <td>{formatCurrency(price)} ₫</td>
                                                                    <td className={styles.productTotal}>
                                                                        {formatCurrency(total)} ₫
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className={styles.noProducts}>
                                                <p>Không có thông tin sản phẩm</p>
                                                {selectedOrderDetail.orderDetails && (
                                                    <div className={styles.debugInfo}>
                                                        <p style={{fontSize: '12px', color: '#666'}}>
                                                            Raw data: {JSON.stringify(selectedOrderDetail.orderDetails, null, 2)}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.modalFooter}>
                                    <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCloseViewModal}>
                                        Đóng
                                    </button>
                                    <button 
                                        className={`${styles.button} ${styles.primaryButton} ${!canEditOrder(selectedOrderDetail.status) ? styles.disabledButton : ''}`} 
                                        onClick={() => {
                                            if (canEditOrder(selectedOrderDetail.status)) {
                                                handleCloseViewModal();
                                                handleEditClick(selectedOrderDetail);
                                            }
                                        }}
                                        disabled={!canEditOrder(selectedOrderDetail.status)}
                                        title={!canEditOrder(selectedOrderDetail.status) ? 'Chỉ có thể chỉnh sửa đơn hàng ở trạng thái "Đang chờ xử lý", "Đang chờ thanh toán" hoặc "Thanh toán thất bại"' : 'Chỉnh sửa đơn hàng'}
                                    >
                                        {!canEditOrder(selectedOrderDetail.status) ? 'Không thể chỉnh sửa' : 'Chỉnh sửa'}
                                    </button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};