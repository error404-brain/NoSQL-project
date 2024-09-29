import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white p-8 mt-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Information */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Tổng Công Ty Cổ Phần Bưu Chính Viettel</h3>
                    <p className="text-gray-400 mb-2">Viettel Post là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát nhanh hàng hóa, bưu kiện trong nước, quốc tế tại Việt Nam.</p>
                    <ul className="text-gray-400">
                        <li className="mb-1">📄 Giấy chứng nhận Đăng ký Kinh doanh số: 0104093672</li>
                        <li className="mb-1">📄 Giấy phép bưu chính số 229/GP-BTTTT</li>
                        <li className="mb-1">📄 Văn bản xác nhận hoạt động bưu chính số 3712/XN-BTTTT</li>
                    </ul>
                </div>

                {/* About ViettelPost Links */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Về ViettelPost</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#gioi-thieu" className="hover:text-gray-300">Giới thiệu</a></li>
                        <li><a href="#tin-tuc" className="hover:text-gray-300">Tin tức</a></li>
                        <li><a href="#mang-luoi" className="hover:text-gray-300">Mạng lưới bưu cục</a></li>
                        <li><a href="#tuyen-dung" className="hover:text-gray-300">Tuyển dụng</a></li>
                        <li><a href="#hop-tac" className="hover:text-gray-300">Hợp tác</a></li>
                        <li><a href="#api" className="hover:text-gray-300">Kết nối API</a></li>
                    </ul>
                </div>

                {/* Customer Support Links */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Hỗ Trợ Khách Hàng</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#chat" className="hover:text-gray-300">Chat online với CSKH</a></li>
                        <li><a href="#huong-dan" className="hover:text-gray-300">Hướng dẫn sử dụng dịch vụ</a></li>
                        <li><a href="#faq" className="hover:text-gray-300">Câu hỏi thường gặp</a></li>
                        <li><a href="#dieu-khoan" className="hover:text-gray-300">Điều khoản sử dụng</a></li>
                        <li><a href="#bao-mat" className="hover:text-gray-300">Chính sách bảo mật thông tin</a></li>
                        <li><a href="#van-chuyen" className="hover:text-gray-300">Chính sách vận chuyển</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Hợp Tác Khách Hàng</h3>
                    <div className="text-gray-400">
                        <p className="mb-2">📞 0862235888</p>
                        <p className="mb-2">📧 b2b@viettelpost.com.vn</p>
                        <p className="mb-4">Hợp tác khách hàng cá nhân:</p>
                        <p className="mb-2">📞 0983653311</p>
                        <p className="mb-2">📧 kinhdoanh@viettelpost.com.vn</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-gray-300">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-300">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://zalo.me" className="text-gray-400 hover:text-gray-300">
                            <i className="fab fa-zalo"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 mt-8">
                <p>Kết nối cùng ViettelPost © 2024 Viettel Post. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
