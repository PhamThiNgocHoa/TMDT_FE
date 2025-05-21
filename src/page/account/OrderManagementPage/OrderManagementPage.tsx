import React, { useState } from "react";
import "./OrderManagementPage.css";
import {
  FaCalendarAlt,
  FaFilter,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
// Giả sử bạn đã có các component Header, Footer
// import Header from "../../component/Header";

const sidebarMenu = [
  { label: "Lịch sử đơn hàng", active: true },
  // { label: "Đơn hàng đã huỷ", active: false },
  // { label: "Theo dõi chi tiết vận chuyển", active: false },
];
const policyMenu = [
  { label: "Chính sách bảo hành" },
  { label: "Chính sách đổi trả" },
];
const tabs = [
  "Tất cả",
  "Xác nhận",
  "Chờ vận chuyển",
  "Đang vận chuyển",
  "Thành công",
  "Chờ huỷ đơn",
  "Đã huỷ",
];
const orders = [
  // Dữ liệu mẫu, bạn có thể thay bằng fetch thực tế
  {
    id: "302012",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Chờ vận chuyển",
    statusType: "pending",
    products: 3,
  },
  {
    id: "302013",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Đã huỷ",
    statusType: "cancel",
    products: 3,
  },
  {
    id: "302014",
    product: "iPhone 11 Pro",
    img: "https://cdn.tgdd.vn/Products/Images/42/190322/iphone-11-pro-max-green-600x600.jpg",
    note: "Không có",
    total: "12.000.000đ",
    date: "24/3/2025",
    status: "Đang vận chuyển",
    statusType: "shipping",
    products: 3,
  },
  // ... thêm các đơn hàng khác tương tự
];

const statusColor: { [key: string]: string } = {
  "Chờ vận chuyển": "pending",
  "Đã huỷ": "cancel",
  "Đang vận chuyển": "shipping",
  "Thành công": "success",
  "Chờ huỷ đơn": "waiting",
};

// Thêm type cho props của OrderTabs
interface OrderTabsProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}
const OrderTabs = ({ activeTab, setActiveTab }: OrderTabsProps) => (
  <div className="order-tabs-wrapper">
    <div className="order-tabs-list">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={activeTab === idx ? "active" : ""}
          onClick={() => setActiveTab(idx)}
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
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [activePolicy, setActivePolicy] = useState(-1);

  // Lọc đơn hàng khi thay đổi tab, ngày hoặc tìm kiếm
  React.useEffect(() => {
    let filtered = orders;
    if (activeTab !== 0) {
      filtered = filtered.filter((order) => order.status === tabs[activeTab]);
    }
    if (selectedDate) {
      filtered = filtered.filter((order) => {
        const [day, month, year] = order.date.split("/");
        const orderDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
        return orderDate === selectedDate;
      });
    }
    if (search) {
      filtered = filtered.filter(
        (order) =>
          order.id.includes(search) ||
          order.product.toLowerCase().includes(search.toLowerCase()) ||
          order.date.includes(search)
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset page khi filter
  }, [activeTab, selectedDate, search]);

  // Phân trang
  const totalPage = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="order-page-bg">
      <div className="order-container">
        <aside className="order-sidebar">
          <div className="order-sidebar-title">Quản lý đơn hàng cá nhân</div>
          <ul className="order-sidebar-menu">
            {sidebarMenu.map((item, idx) => (
              <li
                key={idx}
                className={activeSidebar === idx ? "active" : ""}
                onClick={() => {
                  setActiveSidebar(idx);
                  setActivePolicy(-1);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
          <div className="order-sidebar-title" style={{ marginTop: 32 }}>
            Chính sách đổi trả & bảo hành
          </div>
          <ul className="order-sidebar-menu">
            {policyMenu.map((item, idx) => (
              <li
                key={idx}
                className={activePolicy === idx ? "active" : ""}
                onClick={() => {
                  setActivePolicy(idx);
                  setActiveSidebar(-1);
                }}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </aside>
        <main className="order-main">
          {/* Tabs và bộ lọc */}
          {activeSidebar === 0 && (
            <>
              <div className="order-header-bar">
                <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="order-header-actions">
                  <label className="order-date-picker">
                    <FaCalendarAlt style={{ marginRight: 6 }} />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </label>
                  <button
                    className="order-filter-btn"
                    onClick={() => setSelectedDate("")}
                    title="Bỏ lọc ngày"
                  >
                    <FaFilter style={{ marginRight: 6 }} /> Lọc lại
                  </button>
                </div>
              </div>
              {/* Thanh tìm kiếm */}
              <div className="order-search-row">
                <input
                  className="order-search-input"
                  placeholder="Tìm kiếm đơn hàng qua Mã đơn hàng, Tên sản phẩm, Ngày mua,..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="order-search-icon">
                  <FaFilter />
                </span>
              </div>
              {/* Danh sách đơn hàng */}
              <div className="order-list">
                {paginatedOrders.length === 0 ? (
                  <div className="order-empty">Không có đơn hàng phù hợp.</div>
                ) : (
                  <table className="order-table">
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>
                        <th>Mã đơn</th>
                        <th>Sản phẩm</th>
                        <th>Ghi chú</th>
                        <th>Tổng</th>
                        <th>Mua ngày</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedOrders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td className="order-id">{order.id}</td>
                          <td className="order-product">
                            <img src={order.img} alt={order.product} />
                            <div>
                              {order.product}
                              <div className="order-product-count">
                                +{order.products} Products
                              </div>
                            </div>
                          </td>
                          <td>{order.note}</td>
                          <td>{order.total}</td>
                          <td>{order.date}</td>
                          <td>
                            <span
                              className={`order-status ${order.statusType}`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {/* Phân trang */}
              <div className="order-pagination">
                <div className="order-pagination-info">
                  Showing {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, filteredOrders.length)} from{" "}
                  {filteredOrders.length}
                </div>
                <div className="order-pagination-pages">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPage }, (_, i) => (
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
          {activePolicy === 0 && (
            <div className="policy-content warranty-policy">
              <h2>
                <b>Chính sách bảo hành cho khách ở OrangeTech</b>
              </h2>
              <button className="warranty-btn">Tra cứu phiếu bảo hành</button>
              <p>
                Quý khách vui lòng nhập cả 2 trường thông tin (bắt buộc) để tra
                cứu trạng thái của phiếu bảo hành
              </p>
              <div className="warranty-form-row">
                <input className="warranty-input" placeholder="Số điện thoại" />
                <input
                  className="warranty-input"
                  placeholder="Mã phiếu bảo hành"
                />
                <button className="warranty-btn small">Tra cứu</button>
              </div>
              <hr style={{ margin: "32px 0 18px 0" }} />
              <p>
                Để thuận tiện cho việc tra cứu bảo hành các sản phẩm tại{" "}
                <b>OrangeTech</b>, xin kính gửi Quý khách hàng các thông tin
                chính sách bảo hành tại <b>OrangeTech</b> và các thông tin liên
                hệ khi cần.
              </p>
              <div className="warranty-conditions">
                <b>ĐIỀU KIỆN BẢO HÀNH</b>
                <ul>
                  <li>
                    Sản phẩm còn trong thời hạn bảo hành của <b>OrangeTech</b>;
                    Thời hạn bảo hành được ghi nhận dựa trên thông tin mua hàng,
                    số Serial Number của sản phẩm.
                  </li>
                  <li>
                    Sản phẩm phải còn tem niêm phong bảo hành hoặc tem của nhà
                    phân phối. Với các sản phẩm cần bảo hành theo hộp, khách
                    hàng phải gửi đầy đủ hộp và phụ kiện đi kèm.
                  </li>
                  <li>
                    Sản phẩm còn nguyên trạng, không trầy xước cảm ứng mỏng,
                    biến dạng ngoài quy định của hãng/ nhà phân phối.
                  </li>
                  <li>
                    Sản phẩm phát sinh lỗi trong quá trình sử dụng do nhà sản
                    xuất như linh kiện, lỗi kỹ thuật.
                  </li>
                </ul>
                <b>Lưu ý:</b>
                <ul>
                  <li style={{ color: "#db4444" }}>
                    Các điều kiện bảo hành cụ thể có thể thay đổi tùy theo từng
                    nhà sản xuất và nhà cung cấp sản phẩm.
                  </li>
                  <li style={{ color: "#db4444" }}>
                    Dữ liệu (lưu trữ trong sản phẩm: Laptop/ Máy tính để bàn/
                    Thẻ nhớ/ Ổ cứng...) không thuộc phạm vi bảo hành. Chúng tôi
                    hoàn toàn ý thức được tầm quan trọng của dữ liệu của quý
                    khách hàng và luôn cố gắng hết sức để hỗ trợ - hướng dẫn quý
                    khách hàng trong việc sao lưu dữ liệu. <b>OrangeTech</b>{" "}
                    không chịu trách nhiệm về bất cứ thiệt hại trực tiếp hoặc
                    gián tiếp nào gây ra cho quý khách hàng nếu dữ liệu lưu
                    trong sản phẩm bị thất lạc, bị mất, bị hư hỏng trong quá
                    trình kiểm tra, xử lý bảo hành.
                  </li>
                  <li>
                    Nên tham khảo kỹ phiếu bảo hành và chính sách bảo hành của
                    nhà sản xuất trước khi sử dụng sản phẩm.
                  </li>
                </ul>
              </div>
            </div>
          )}
          {activePolicy === 1 && (
            <div className="policy-content return-policy">
              <h2>
                <b>Chính sách đổi trả cho khách ở OrangeTech</b>
              </h2>
              <ol>
                <li>
                  <b>Điều kiện đổi trả</b>
                  <p>
                    Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể
                    đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng
                    trong những trường hợp sau:
                  </p>
                  <ul>
                    <li>
                      Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt
                      hoặc như trên website tại thời điểm đặt hàng.
                    </li>
                    <li>Không đủ số lượng, không đủ bộ như trong đơn hàng.</li>
                    <li>
                      Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong
                      tróc, bể vỡ...
                    </li>
                  </ul>
                  <p>
                    Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh
                    sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng
                    hóa.
                  </p>
                </li>
                <li>
                  <b>Quy định về thời gian thông báo và gửi sản phẩm đổi trả</b>
                  <ul>
                    <li>
                      Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận
                      sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà
                      tặng hoặc bị vỡ bể.
                    </li>
                    <li>
                      Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể
                      từ khi nhận sản phẩm.
                    </li>
                    <li>
                      Địa điểm đổi trả sản phẩm: Khách hàng có thể mang trực
                      tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua
                      đường bưu điện.
                    </li>
                  </ul>
                </li>
              </ol>
              <p>
                Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại
                liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên
                hệ đường dây chăm sóc khách hàng của chúng tôi.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OrderManagementPage;
