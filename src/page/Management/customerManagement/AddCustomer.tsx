import React, { useState } from 'react';
import styles from './AddCustomer.module.css';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';

export function AddCustomer() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('active'); // active/inactive
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleSave = () => {
        if (!fullName || !email) {
            alert('Họ tên và Email là bắt buộc!');
            return;
        }
        // Thay bằng API gọi backend hoặc logic lưu dữ liệu
        console.log('Saving user...', { fullName, email, phone, address, status, avatar });
        alert('Đã lưu người dùng thành công!');
    };

    const handleCancel = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setStatus('active');
        setAvatar(null);
        alert('Hủy thêm người dùng');
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            alert(`Đã chọn ảnh: ${e.target.files[0].name}`);
        }
    };

    return (
        <div className={styles.addCustomerContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.headerSection}>
                    <h2>Thêm Người Dùng Mới</h2>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fullName" className={styles.label}>Họ và Tên *</label>
                        <input
                            type="text"
                            id="fullName"
                            className={styles.input}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ và tên"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email *</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Số điện thoại</label>
                        <input
                            type="tel"
                            id="phone"
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            className={styles.input}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Nhập địa chỉ"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Trạng thái</label>
                        <select
                            className={styles.select}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ảnh đại diện</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className={styles.fileInput}
                        />
                        {avatar && <p className={styles.fileName}>{avatar.name}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <div className={styles.actionButtons}>
                            <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy</button>
                            <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSave}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
