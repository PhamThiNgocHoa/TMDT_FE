import { AdminSidebar } from "../Management/postManagement/AdminSidebar";
import { Header } from "../Management/postManagement/components/Header";
import styles from "../Management/postManagement/PostManagement.module.css";

export default function ProductsPage() {
  return (
    <div className={styles.postManagement}>
      <AdminSidebar />
      <div className={styles.body}>
        <Header />
        {/* ...phần còn lại của giao diện quản lý sản phẩm... */}
      </div>
    </div>
  );
}
