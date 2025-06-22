import React, { useState } from "react";
import {
  FaPen,
  FaEye,
  FaTrash,
  FaUpload,
  FaFileExport,
  FaPlus,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import "./UserPermissionPage.css";
import styles from "../../Management/postManagement/PostManagement.module.css";
import { Header } from "../../Management/postManagement/components/Header";
import {AdminSidebar} from "../../Management/AdminSidebar";
import useCustomer from "../../../hooks/useCustomer";
import {CustomerTable} from "./CustomerTable";

export interface User {
  id: string;
  name: string;
  age: number;
  days: string;
  salary: string;
  access: string;
  avatar: string;
}

const initialUsers: User[] = [
  {
    id: "402011",
    name: "David A",
    age: 23,
    days: "Đủ",
    salary: "Đang chờ",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Jery B",
    age: 24,
    days: "Đủ",
    salary: "Đã duyệt",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Trần Minh Thắng",
    age: 25,
    days: "Đủ",
    salary: "Đang chờ",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Trần Minh Thắng",
    age: 26,
    days: "Đủ",
    salary: "Đã duyệt",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Trần Minh Thắng",
    age: 35,
    days: "Đủ",
    salary: "Đang chờ",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Trần Minh Thắng",
    age: 34,
    days: "Đủ",
    salary: "Đã duyệt",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
  {
    id: "402011",
    name: "Trần Minh Thắng",
    age: 33,
    days: "Đủ",
    salary: "Đang chờ",
    access: "Active",
    avatar: "https://i.imgur.com/1Q9Z1Zm.png",
  },
];

const tabs = ["Tất cả nhân viên", "Đã duyệt", "Đang chờ"];

function Tabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}) {
  return (
    <div className={styles.tabsFilter}>
      {tabs.map((tab: string, idx: number) => (
        <button
          key={tab}
          className={activeTab === idx ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function FilterBar({
  date,
  setDate,
  search,
  setSearch,
}: {
  date: string;
  setDate: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 18,
        justifyContent: "flex-end",
      }}
    >
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px 32px 8px 12px",
            borderRadius: 8,
            border: "1.5px solid #e0e0e0",
            minWidth: 220,
            fontSize: 15,
          }}
        />
        <FaSearch
          style={{
            position: "absolute",
            right: 10,
            top: 10,
            color: "#b0b0b0",
            fontSize: 15,
          }}
        />
      </div>
      <button
        className="user-btn"
        style={{
          background: "#fff",
          color: "#222",
          border: "1.5px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FaCalendarAlt style={{ color: "#b0b0b0" }} />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "1rem",
            color: "#222",
            outline: "none",
          }}
        />
      </button>
      <button
        className="user-btn"
        style={{
          background: "#fff",
          color: "#222",
          border: "1.5px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FaFilter style={{ color: "#b0b0b0" }} /> Filters
      </button>
    </div>
  );
}

function AddUserModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
}) {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [access, setAccess] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  return open ? (
    <div className="add-product-modal-bg">
      <div className="add-product-modal" style={{ maxWidth: 420 }}>
        <div className="add-product-header">
          <div>
            <div className="add-product-breadcrumb">
              Trang chủ &gt; Phân quyền người dùng &gt; Thêm nhân viên
            </div>
            <div className="add-product-title">Thêm nhân viên</div>
          </div>
          <div className="add-product-header-actions">
            <button className="add-btn cancel" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
        <form
          className="add-product-content"
          style={{ flexDirection: "column", gap: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, age: Number(age), access, salary, avatar });
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <b>Tên nhân viên:</b>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Tuổi:</b>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Quyền truy cập:</b>
            <input
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Lương:</b>
            <select
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Đang chờ">Đang chờ</option>
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Avatar (URL):</b>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button className="add-btn confirm" type="submit">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

function EditUserModal({
  open,
  user,
  onClose,
  onSubmit,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSubmit: (user: Partial<User>) => void;
}) {
  const [name, setName] = React.useState(user?.name || "");
  const [age, setAge] = React.useState(user?.age?.toString() || "");
  const [days, setDays] = React.useState(user?.days || "");
  const [access, setAccess] = React.useState(user?.access || "");
  const [salary, setSalary] = React.useState(user?.salary || "");
  const [avatar, setAvatar] = React.useState(user?.avatar || "");
  React.useEffect(() => {
    setName(user?.name || "");
    setAge(user?.age?.toString() || "");
    setDays(user?.days || "");
    setAccess(user?.access || "");
    setSalary(user?.salary || "");
    setAvatar(user?.avatar || "");
  }, [user, open]);
  return open && user ? (
    <div className="add-product-modal-bg">
      <div className="add-product-modal" style={{ maxWidth: 420 }}>
        <div className="add-product-header">
          <div>
            <div className="add-product-breadcrumb">
              Trang chủ &gt; Phân quyền người dùng &gt; Sửa nhân viên
            </div>
            <div className="add-product-title">Sửa nhân viên</div>
          </div>
          <div className="add-product-header-actions">
            <button className="add-btn cancel" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
        <form
          className="add-product-content"
          style={{ flexDirection: "column", gap: 0 }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, age: Number(age), days, access, salary, avatar });
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <b>Tên nhân viên:</b>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Tuổi:</b>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Số ngày làm:</b>
            <input
              value={days}
              onChange={(e) => setDays(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Quyền truy cập:</b>
            <input
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Lương:</b>
            <select
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            >
              <option value="">Chọn trạng thái</option>
              <option value="Đã duyệt">Đã duyệt</option>
              <option value="Đang chờ">Đang chờ</option>
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Avatar (URL):</b>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              style={{
                width: "100%",
                marginTop: 4,
                padding: 6,
                borderRadius: 6,
                border: "1.5px solid #eee",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button className="add-btn confirm" type="submit">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

function ViewUserModal({
  open,
  user,
  onClose,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
}) {
  return open && user ? (
    <div className="add-product-modal-bg">
      <div className="add-product-modal" style={{ maxWidth: 420 }}>
        <div className="add-product-header">
          <div>
            <div className="add-product-breadcrumb">
              Trang chủ &gt; Phân quyền người dùng &gt; Xem nhân viên
            </div>
            <div className="add-product-title">Chi tiết nhân viên</div>
          </div>
          <div className="add-product-header-actions">
            <button className="add-btn cancel" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
        <div
          className="add-product-content"
          style={{ flexDirection: "column", gap: 0 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 18,
            }}
          >
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                border: "2px solid #eee",
              }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>{user.name}</div>
              <div style={{ color: "#2563eb", fontWeight: 600 }}>{user.id}</div>
              <div style={{ marginTop: 6 }}>
                <span
                  className={
                    user.salary === "Đã duyệt"
                      ? `${styles.status} ${styles.published}`
                      : `${styles.status} ${styles.pending}`
                  }
                >
                  {user.salary}
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Tuổi:</b> {user.age}
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Quyền truy cập:</b> {user.access}
          </div>
          <div style={{ marginBottom: 12 }}>
            <b>Số ngày làm:</b> {user.days}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

function DeleteUserModal({
  open,
  user,
  onClose,
  onConfirm,
}: {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return open && user ? (
    <div className="add-product-modal-bg">
      <div className="add-product-modal" style={{ maxWidth: 380 }}>
        <div className="add-product-header">
          <div>
            <div className="add-product-breadcrumb">
              Trang chủ &gt; Phân quyền người dùng &gt; Xoá nhân viên
            </div>
            <div className="add-product-title">Xoá nhân viên</div>
          </div>
          <div className="add-product-header-actions">
            <button className="add-btn cancel" onClick={onClose}>
              Huỷ
            </button>
          </div>
        </div>
        <div
          className="add-product-content"
          style={{ flexDirection: "column", gap: 0 }}
        >
          <p>
            Bạn có chắc muốn xoá nhân viên <b>{user.name}</b>?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              marginTop: 16,
            }}
          >
            <button className="add-btn confirm" onClick={onConfirm}>
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

function ActionButtons({ onAdd }: { onAdd: () => void }) {
  return (
    <div className={styles.right2}>
      <button className={styles.adminButtonWithIcon}>
        <i className="fas fa-file-export"></i>
        <span>Xuất file</span>
      </button>
      <button className={styles.adminButtonWithIcon2} onClick={onAdd}>
        <i className="fas fa-plus"></i>
        <span>Thêm nhân viên</span>
      </button>
    </div>
  );
}

interface UserTableProps {
  users: User[];
  selected: number[];
  setSelected: (v: number[]) => void;
  selectAll: boolean;
  setSelectAll: (v: boolean) => void;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (idx: number) => void;
}

function UserTable({
  users,
  selected,
  setSelected,
  selectAll,
  setSelectAll,
  onEdit,
  onView,
  onDelete,
}: UserTableProps) {
  const handleSelect = (idx: number) => {
    setSelected(
      selected.includes(idx)
        ? selected.filter((i) => i !== idx)
        : [...selected, idx]
    );
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected(users.map((_, idx) => idx));
      setSelectAll(true);
    }
  };
  React.useEffect(() => {
    setSelectAll(selected.length === users.length && users.length > 0);
  }, [selected, users, setSelectAll]);

  return (
    <div className={styles.tableContainer}>
      {selected.length > 0 && (
        <div className={styles.bulkActions}>
          <span className={styles.selectedCount}>
            Đã chọn {selected.length} nhân viên
          </span>
          <button
            className={styles.deleteSelectedBtn}
            onClick={() => {
              if (
                window.confirm(
                  `Bạn có chắc chắn muốn xóa (${selected.length}) nhân viên đã chọn?`
                )
              ) {
                selected.forEach((idx) => onDelete(idx));
              }
            }}
          >
            <i className="fas fa-trash"></i>
            Xóa đã chọn
          </button>
        </div>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Nhân viên</th>
            <th>ID</th>
            <th>Tuổi</th>
            <th>Số ngày làm</th>
            <th>Lương</th>
            <th>Quyền truy cập</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User, idx: number) => (
            <tr key={user.id + idx}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(idx)}
                  onChange={() => handleSelect(idx)}
                />
              </td>
              <td className={styles.postInfo}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.thumbnail}
                />
                <span className={styles.postTitleText}>{user.name}</span>
              </td>
              <td className={styles.postId}>{user.id}</td>
              <td>{user.age}</td>
              <td>{user.days}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    user.salary === "Đã duyệt"
                      ? styles.published
                      : styles.pending
                  }`}
                >
                  {user.salary}
                </span>
              </td>
              <td>{user.access}</td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    title="Sửa"
                    onClick={() => onEdit(user)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className={styles.viewBtn}
                    title="Xem"
                    onClick={() => onView(user)}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    title="Xoá"
                    onClick={() => onDelete(idx)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (v: number) => void;
  totalPage: number;
}

function Pagination({
  currentPage,
  setCurrentPage,
  totalPage,
}: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>Hiển thị 1-10 trên 100</div>
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        {[...Array(totalPage)].map((_, i: number) => (
          <button
            key={i + 1}
            className={
              currentPage === i + 1
                ? `${styles.paginationPageButton} ${styles.active}`
                : styles.paginationPageButton
            }
            onClick={() => setCurrentPage(i + 1)}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
        <button
          className={styles.paginationButton}
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default function UserPermissionPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const {user} = useCustomer();
  const pageSize = 10;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter, search, phân trang động
  const filteredUsers = users.filter((user) => {
    // Tab filter
    if (activeTab === 1 && user.salary !== "Đã duyệt") return false;
    if (activeTab === 2 && user.salary !== "Đang chờ") return false;
    // Search
    if (
      search &&
      !(
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.id.includes(search)
      )
    )
      return false;
    // Date filter (giả lập: lọc theo tuổi nếu ngày chọn trùng với tuổi)
    if (date) {
      const d = new Date(date);
      if (user.age !== d.getDate()) return false;
    }
    return true;
  });
  const totalPage = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Action thực tế
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleView = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };
  const handleDelete = (idx: number) => {
    setSelectedUser(paginatedUsers[idx]);
    setShowDeleteModal(true);
  };

  React.useEffect(() => {
    setCurrentPage(1); // Reset page khi filter/search
  }, [activeTab, search, date]);

  return (
    <div className={styles.postManagement}>
      <AdminSidebar user={user} />
      <div className={styles.body}>
        <Header />
        <header className={styles.adminTitle}>
          <div className={styles.title}>
            <h1 className={styles.text}>Phân quyền người dùng</h1>
            <nav className={styles.adminBreadcrumbs}>
              <a href="/admin">Trang chủ</a>
              <span>/</span>
              <span>Phân quyền người dùng</span>
            </nav>
          </div>
          <ActionButtons onAdd={() => setShowAddModal(true)} />
        </header>
        <div className={styles.content}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <FilterBar
            date={date}
            setDate={setDate}
            search={search}
            setSearch={setSearch}
          />
          <CustomerTable/>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPage}
          />
        </div>
        <AddUserModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={(user) => {
            setUsers((prev) => [
              {
                id: Date.now().toString(),
                name: user.name || "",
                age: user.age || 0,
                days: "Đủ",
                salary: user.salary || "Đang chờ",
                access: user.access || "Active",
                avatar: user.avatar || "https://i.imgur.com/1Q9Z1Zm.png",
              },
              ...prev,
            ]);
            setShowAddModal(false);
          }}
        />
        <EditUserModal
          open={showEditModal}
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSubmit={(user) => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === selectedUser?.id
                  ? {
                      ...u,
                      ...user,
                      age: user.age || u.age,
                      days: user.days || u.days,
                    }
                  : u
              )
            );
            setShowEditModal(false);
          }}
        />
        <ViewUserModal
          open={showViewModal}
          user={selectedUser}
          onClose={() => setShowViewModal(false)}
        />
        <DeleteUserModal
          open={showDeleteModal}
          user={selectedUser}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            setUsers((prev) => prev.filter((u) => u.id !== selectedUser?.id));
            setShowDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
}
