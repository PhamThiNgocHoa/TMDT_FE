import React, { useState, useEffect } from "react";
import "./OrderManagementPage.css";
import useOrder from "../../../hooks/useOrder";
import {OrderStatus, OrderStatusDisplayName} from "../../../enums/OrderStatus";
interface OrderTabsProps {
    activeTab: number;
    setActiveTab: (tab: number) => void;
}

export const OrderStatusColorMap: Record<OrderStatus, string> = {
    [OrderStatus.PENDING_PAYMENT]: "#FFA500",
    [OrderStatus.PENDING]: "#FFC107",
    [OrderStatus.PAYMENT_FAILED]: "#DC3545",
    [OrderStatus.PAYMENT_SUCCESS]: "#28A745",
    [OrderStatus.SHIPPING]: "#17A2B8",
    [OrderStatus.DELIVERED]: "#007BFF",
    [OrderStatus.CANCELLED]: "#6C757D",
    [OrderStatus.RETURNED]: "#8B0000"
};

const tabs = ["Tất cả", ...Object.values(OrderStatus).map((status) => OrderStatusDisplayName[status])];

const OrderTabs: React.FC<OrderTabsProps> = ({ activeTab, setActiveTab }) => (
    <div
        className="order-tabs-wrapper"
        style={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: 8,
        }}
    >
        <div className="order-tabs-list" style={{
            display: 'inline-flex',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '10px'
        }}
        >
            {tabs.map((tab, idx) => (
                <button
                    key={tab}
                    className={activeTab === idx ? "active" : ""}
                    onClick={() => setActiveTab(idx)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 20,
                        border: '1px solid #ccc',
                        backgroundColor: activeTab === idx ? '#ffffff' : '#f8f9fa',
                        color: activeTab === idx ? '#000' : '#333',
                        boxShadow: activeTab === idx ? '0 4px 6px rgba(255, 0, 0, 0.8)' : 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease-in-out',
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    </div>
);


const OrderManagementPage = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const {orders} = useOrder();
    const [filteredOrders, setFilteredOrders] = useState(orders || []);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [activeSidebar, setActiveSidebar] = useState(0);
    const orderStatusValues = Object.values(OrderStatus);

    useEffect(() => {
        if (!orders || !Array.isArray(orders)) {
            setFilteredOrders([]);
            return;
        }

        let filtered = [...orders];

        if (activeTab !== 0) {
            const selectedStatus = orderStatusValues[activeTab - 1];
            filtered = filtered.filter((order) => order.status === selectedStatus);
        }
        if (selectedDate) {
            filtered = filtered.filter((order) => {
                const [day, month, year] = order.orderDate.split("/");
                const orderDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
                return orderDate === selectedDate;
            });
        }
        if (search) {
            filtered = filtered.filter((order) => {
                const orderIdStr = order.id.toString();
                const productNames = order.orderDetails
                    .map((d) => d.productResponseDTO.name)
                    .join(" ")
                    .toLowerCase();
                return (
                    orderIdStr.includes(search) ||
                    productNames.includes(search.toLowerCase()) ||
                    order.orderDate.includes(search)
                );
            });
        }

        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [orders, activeTab, selectedDate, search]);


    const totalPage = Math.ceil(filteredOrders.length / pageSize);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="order-page-bg" style={{position: "relative",  backgroundColor: "white", width: "full", height: "full"}}>
            <div className="order-container">
                <main className="order-main">
                    {activeSidebar === 0 && (
                        <>
                            <div className="order-header-bar">
                                <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
                            </div>
                            <div className="order-search-row">
                                <input
                                    className="order-search-input"
                                    placeholder="Tìm kiếm đơn hàng qua Mã đơn hàng, Tên sản phẩm, Ngày mua,..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="order-list">
                                {paginatedOrders.length === 0 ? (
                                    <div className="order-empty">Không có đơn hàng phù hợp.</div>
                                ) : (
                                    <table className="order-table">
                                        <thead>
                                        <tr>
                                            <th><input type="checkbox"/></th>
                                            <th>Mã đơn</th>
                                            <th>Sản phẩm</th>
                                            <th>Người nhận</th>
                                            <th>Tổng</th>
                                            <th>Mua ngày</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {paginatedOrders.map((order) => (
                                            <tr key={order.id}>
                                                <td><input type="checkbox"/></td>
                                                <td>{order.id}</td>
                                                <td className="order-product">
                                                    <img
                                                        src={order.orderDetails[0].productResponseDTO.img}
                                                        alt={order.orderDetails[0].productResponseDTO.name}
                                                    />
                                                    <div>
                                                        {order.orderDetails[0].productResponseDTO.name}
                                                        <div className="order-product-count">
                                                            +{order.orderDetails.length - 1} sản phẩm
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{order.receiver}</td>
                                                <td>{order.totalAmount.toLocaleString("vi-VN")}₫</td>
                                                <td>{order.orderDate}</td>
                                                <td>
                                                    <div
                                                        style={{color: OrderStatusColorMap[order.status as OrderStatus]}}
                                                    >
                                                        {OrderStatusDisplayName[order.status as OrderStatus]}
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <div className="order-pagination">
                                <div className="order-pagination-info">
                                    Showing {(currentPage - 1) * pageSize + 1}-
                                    {Math.min(currentPage * pageSize, filteredOrders.length)} from {filteredOrders.length}
                                </div>
                                <div className="order-pagination-pages">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({length: totalPage}, (_, i) => (
                                        <button
                                            key={i}
                                            className={currentPage === i + 1 ? "active" : ""}
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </button>
                                    ))}
                                    <button
                                        disabled={currentPage === totalPage}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OrderManagementPage;