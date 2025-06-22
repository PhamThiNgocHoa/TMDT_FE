import { Header } from "../Management/postManagement/components/Header";
import styles from "../Management/postManagement/PostManagement.module.css";
import {AdminSidebar} from "../Management/AdminSidebar";
import useCustomer from "../../hooks/useCustomer";

export default function ProductsPage() {
    const {user} = useCustomer();

  return (
    <div className={styles.postManagement}>
      <AdminSidebar user={user} />
      <div className={styles.body}>
        <Header />
        {/* ...phần còn lại của giao diện quản lý sản phẩm... */}
      </div>
    </div>
  );
}
