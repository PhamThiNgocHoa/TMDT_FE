import React, { useState, useEffect } from 'react';
import styles from './EditCustomer.module.css';
// import { useParams, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { Header } from './components/Header';

const fetchFakeCustomerById = (id: number) => {
    const customers = [
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'a@example.com',
            phone: '0909000001',
            status: 'active',
            createdAt: '2024-05-01T10:00:00Z',
        },
        {
            id: 2,
            name: 'Trần Thị B',
            email: 'b@example.com',
            phone: '0909000002',
            status: 'pending',
            createdAt: '2024-05-02T12:00:00Z',
        },
        {
            id: 3,
            name: 'Lê Văn C',
            email: 'c@example.com',
            phone: '0909000003',
            status: 'inactive',
            createdAt: '2024-05-03T14:00:00Z',
        },
    ];

    return customers.find(c => c.id === id) || null;
};

export function EditCustomer() {
    const navigate = useNavigate();

    const id = 1;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState<'active' | 'inactive' | 'pending'>('active');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        const customer = fetchFakeCustomerById(id); // ✅ Luôn fetch bằng ID 1
        if (customer) {
            setName(customer.name);
            setEmail(customer.email);
            setPhone(customer.phone);
            setStatus(customer.status as 'active' | 'inactive' | 'pending');
        } else {
            setError('Không tìm thấy khách hàng với ID này.');
        }
        setLoading(false);
    }, []);

    const handleSave = () => {
        if (!name || !email || !phone) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        console.log('Cập nhật khách hàng:', { id, name, email, phone, status });

        // ❗️Nếu có hệ thống lưu thật, chỗ này gọi API hoặc cập nhật context
        alert('Đã cập nhật thông tin khách hàng!');
        navigate('/management/customerManagement');
    };

    const handleCancel = () => {
        navigate('/management/customerManagement');
    };

    if (loading) {
        return <div className={styles.loading}>Đang tải dữ liệu khách hàng...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.editPostContainer}>
            <AdminSidebar />
            <div className={styles.body}>
                <Header />
                <div className={styles.editPostHeader}>
                    <h2>Chỉnh sửa thông tin khách hàng</h2>
                    <div className={styles.headerActions}>
                        <button className={`${styles.button} ${styles.secondaryButton}`} onClick={handleCancel}>Hủy</button>
                        <button className={`${styles.button} ${styles.primaryButton}`} onClick={handleSave}>Lưu</button>
                    </div>
                </div>
                <div className={styles.editPostContent}>
                    <div className={styles.mainContent}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tên khách hàng</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Trạng thái</label>
                            <select
                                className={styles.select}
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'pending')}
                            >
                                <option value="active">Đang hoạt động</option>
                                <option value="pending">Đang chờ</option>
                                <option value="inactive">Ngừng hoạt động</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
