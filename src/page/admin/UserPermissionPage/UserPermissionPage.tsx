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
    <div className="user-tabs-row">
      {tabs.map((tab: string, idx: number) => (
        <button
          key={tab}
          className={activeTab === idx ? "active" : ""}
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

function ActionButtons() {
  return (
    <div className="user-header-actions">
      <button className="user-btn orange">
        <FaUpload style={{ marginRight: 6 }} />
        Tải lên
      </button>
      <button className="user-btn purple">
        <FaFileExport style={{ marginRight: 6 }} />
        Xuất file
      </button>
      <button className="user-btn blue">
        <FaPlus style={{ marginRight: 6 }} />
        Thêm nhân viên
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
    <div className="user-table-wrap">
      <table className="user-table">
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
              <td className="user-info-cell">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="user-avatar"
                />
                {user.name}
              </td>
              <td className="user-link">{user.id}</td>
              <td>{user.age}</td>
              <td>{user.days}</td>
              <td>
                <span
                  className={`user-badge ${
                    user.salary === "Đã duyệt" ? "success" : "waiting"
                  }`}
                >
                  {user.salary}
                </span>
              </td>
              <td>{user.access}</td>
              <td>
                <button
                  className="user-action-btn"
                  title="Sửa"
                  onClick={() => onEdit(user)}
                >
                  <FaPen />
                </button>
                <button
                  className="user-action-btn"
                  title="Xem"
                  onClick={() => onView(user)}
                >
                  <FaEye />
                </button>
                <button
                  className="user-action-btn"
                  title="Xoá"
                  onClick={() => onDelete(idx)}
                >
                  <FaTrash />
                </button>
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
    <div className="user-pagination">
      <div className="user-pagination-info">Showing 1-10 from 100</div>
      <div className="user-pagination-pages">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        {[...Array(totalPage)].map((_, i: number) => (
          <button
            key={i + 1}
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
  const pageSize = 10;

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
    alert(`Chỉnh sửa: ${user.name}`);
  };
  const handleView = (user: User) => {
    alert(`Xem chi tiết: ${user.name}`);
  };
  const handleDelete = (idx: number) => {
    if (window.confirm("Bạn có chắc muốn xoá nhân viên này?")) {
      // idx là index trong paginatedUsers, cần map về index thực trong users
      const realIdx = users.findIndex((u) => u === paginatedUsers[idx]);
      if (realIdx !== -1) {
        setUsers((prev) => prev.filter((_, i) => i !== realIdx));
        setSelected((prev) => prev.filter((i) => i !== realIdx));
      }
    }
  };

  React.useEffect(() => {
    setCurrentPage(1); // Reset page khi filter/search
  }, [activeTab, search, date]);

  return (
    <div className="user-permission-page">
      <div className="user-header-row">
        <div className="user-header-title">Phân quyền người dùng</div>
        <ActionButtons />
      </div>
      <div className="user-breadcrumb">
        Trang chủ &nbsp; &gt; &nbsp; Phân quyền người dùng
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FilterBar
        date={date}
        setDate={setDate}
        search={search}
        setSearch={setSearch}
      />
      <UserTable
        users={paginatedUsers}
        selected={selected}
        setSelected={setSelected}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
}
