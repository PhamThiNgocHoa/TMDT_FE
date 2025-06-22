import React from 'react';
import {Customer} from "../../../models/Customer";

interface Props {
    customer: Customer;
    onClose: () => void;
}

const ViewCustomer: React.FC<Props> = ({ customer, onClose }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h2>Thông tin khách hàng</h2>
                <p><strong>Họ tên:</strong> {customer.fullname}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Số điện thoại:</strong> {customer.phone}</p>
                <p><strong>Tên đăng nhập:</strong> {customer.username}</p>
                {customer.role && <p><strong>Vai trò:</strong> {customer.role}</p>}
                <button style={styles.button} onClick={onClose}>Đóng</button>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
    },
    popup: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)'
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default ViewCustomer;
