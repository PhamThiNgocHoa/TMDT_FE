import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPass: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !resetCode || !newPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        try {
            const response = await fetch(`/api/customer/resetPassword/${encodeURIComponent(username)}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetCode, newPassword }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đặt lại mật khẩu thành công!',
                    text: 'Bạn có thể đăng nhập lại với mật khẩu mới.',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                const data = await response.json();
                setError(data.message || 'Mã xác nhận không đúng hoặc hết hạn.');
            }
        } catch (error) {
            setError('Lỗi kết nối máy chủ.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Đặt lại mật khẩu</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="username" className="block mb-1 font-medium text-gray-700">
                        Tên đăng nhập
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="resetCode" className="block mb-1 font-medium text-gray-700">
                        Mã xác nhận
                    </label>
                    <input
                        id="resetCode"
                        type="text"
                        placeholder="Nhập mã xác nhận"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="newPassword" className="block mb-1 font-medium text-gray-700">
                        Mật khẩu mới
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Đặt lại mật khẩu
                </button>
            </form>
        </div>
    );
};

export default ResetPass;
