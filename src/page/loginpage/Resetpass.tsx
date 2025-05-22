import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPass: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [resetCode, setResetCode] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !resetCode || !newPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        setError('');
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập lại.'
        }).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className="reset-container" style={{ maxWidth: 400, margin: '100px auto', textAlign: 'left' }}>
            <h2 style={{ textAlign: 'center' }}>Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: 15 }}>
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 15 }}>
                    <label htmlFor="resetCode">Mã xác nhận</label>
                    <input
                        id="resetCode"
                        type="text"
                        placeholder="Nhập mã xác nhận"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: 15 }}>
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                {error && <p style={{ color: 'red', marginBottom: 10 }}>{error}</p>}

                <button type="submit" style={{ padding: '10px 20px', width: '100%' }}>
                    Đặt lại mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ResetPass;
