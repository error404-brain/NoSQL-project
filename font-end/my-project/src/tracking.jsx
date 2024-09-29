import React, { useState } from 'react';
import { searchPackages, searchCustomersByPhone, createCustomer } from './Api'; // Import API functions
import { FaUser, FaPhone, FaEnvelope, FaBox, FaShippingFast } from 'react-icons/fa'; // Import icons

const Tracking = () => {
    const [activeTab, setActiveTab] = useState('traCuu'); // Default tab is 'Tra cứu'
    const [selectedOption, setSelectedOption] = useState(''); // State for selected search option
    const [trackingNumbers, setTrackingNumbers] = useState(''); // State for tracking numbers input
    const [phoneNumber, setPhoneNumber] = useState(''); // State for customer phone number input
    const [newCustomer, setNewCustomer] = useState({
        customerName: '',
        phoneNumber: '',
        email: '',
        addresses: ''
    }); // New customer state
    const [customerResults, setCustomerResults] = useState(null); // Customer search results
    const [packageResults, setPackageResults] = useState([]); // Package search results
    const [isSearching, setIsSearching] = useState(false); // Searching state
    const [isCreating, setIsCreating] = useState(false); // Creating customer state

    // Handle tab switching (Tra cứu vs Dịch vụ)
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setSelectedOption(''); // Reset search option when switching tabs
    };

    // Search customers by phone number
    const handleSearchCustomersByPhone = async () => {
        setIsSearching(true);
        try {
            const result = await searchCustomersByPhone({ phoneNumber });
            if (result.length > 0) {
                setCustomerResults(result[0]); // Expecting only one customer per phone number
            } else {
                alert('Không tìm thấy khách hàng');
            }
        } catch (error) {
            console.error('Error searching customers:', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Search packages
    const handleSearchPackages = async () => {
        const packageCodes = trackingNumbers.split(',').map(code => code.trim());
        setIsSearching(true);
        try {
            const results = await searchPackages({ packageCode: packageCodes.join(',') });
            setPackageResults(results);
        } catch (error) {
            console.error('Error searching packages:', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Create new customer
    const handleCreateCustomer = async () => {
        setIsCreating(true);
        try {
            await createCustomer(newCustomer);
            alert('Tạo khách hàng thành công!');
            setNewCustomer({
                customerName: '',
                phoneNumber: '',
                email: '',
                addresses: ''
            });
        } catch (error) {
            console.error('Error creating customer:', error);
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Navbar buttons for switching between Tra cứu and Dịch vụ */}
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => handleTabClick('traCuu')}
                    className={`px-6 py-2 ${activeTab === 'traCuu' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} border border-indigo-600 font-semibold rounded-lg transition-all duration-500`}
                >
                    Tra cứu
                </button>
                <button
                    onClick={() => handleTabClick('dichVu')}
                    className={`px-6 py-2 ${activeTab === 'dichVu' ? 'bg-green-600 text-white' : 'bg-white text-green-600'} border border-green-600 font-semibold rounded-lg transition-all duration-500`}
                >
                    Dịch vụ
                </button>
            </div>

            {/* Tra cứu Section */}
            {activeTab === 'traCuu' && (
                <div className="transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
                    <div className="mb-4">
                        <label htmlFor="searchOption" className="block text-lg font-semibold mb-2">Chọn loại tra cứu:</label>
                        <select
                            id="searchOption"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        >
                            <option value="">Chọn tra cứu...</option>
                            <option value="khachHang">Tra cứu khách hàng</option>
                            <option value="buuPham">Tra cứu bưu phẩm</option>
                        </select>
                    </div>

                    {/* Tra cứu khách hàng */}
                    {selectedOption === 'khachHang' && (
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Tra cứu khách hàng</h2>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Nhập số điện thoại"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />
                            <button onClick={handleSearchCustomersByPhone} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">
                                {isSearching ? 'Đang tìm kiếm...' : 'TRA CỨU KHÁCH HÀNG'}
                            </button>

                            {/* Display customer results */}
                            {customerResults && (
                                <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-sm">
                                    <h3 className="text-lg font-bold mb-2">Thông tin khách hàng:</h3>
                                    <div className="space-y-2">
                                        <p><FaUser className="mr-2 inline-block text-indigo-600" /> Tên: {customerResults.customerName}</p>
                                        <p><FaPhone className="mr-2 inline-block text-indigo-600" /> Số điện thoại: {customerResults.phoneNumber}</p>
                                        <p><FaEnvelope className="mr-2 inline-block text-indigo-600" /> Email: {customerResults.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Tra cứu bưu phẩm */}
                    {selectedOption === 'buuPham' && (
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Tra cứu bưu phẩm</h2>
                            <input
                                type="text"
                                value={trackingNumbers}
                                onChange={(e) => setTrackingNumbers(e.target.value)}
                                placeholder="Nhập mã bưu phẩm"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />
                            <button onClick={handleSearchPackages} className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg">
                                {isSearching ? 'Đang tìm kiếm...' : 'TRA CỨU BƯU PHẨM'}
                            </button>

                            {/* Display package results */}
                            {packageResults.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold mb-4">Kết quả tìm kiếm:</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {packageResults.map((pkg) => (
                                            <div key={pkg._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-lg font-semibold flex items-center">
                                                        <FaBox className="mr-2 text-yellow-600" /> Mã bưu phẩm: {pkg.packageCode}
                                                    </h4>
                                                    <span className={`px-3 py-1 rounded-full ${getStatusColor(pkg.packageStatus)}`}>
                                                        {pkg.packageStatus}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 flex items-center">
                                                    <FaShippingFast className="mr-2 text-green-500" /> Trạng thái: {pkg.packageStatus}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Dịch vụ Section */}
            {activeTab === 'dichVu' && (
                <div className="bg-gray-100 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Tạo tài khoản khách hàng mới</h2>
                    <input
                        type="text"
                        value={newCustomer.customerName}
                        onChange={(e) => setNewCustomer({ ...newCustomer, customerName: e.target.value })}
                        placeholder="Tên khách hàng"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <input
                        type="text"
                        value={newCustomer.phoneNumber}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })}
                        placeholder="Số điện thoại"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <input
                        type="text"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <input
                        type="text"
                        value={newCustomer.addresses}
                        onChange={(e) => setNewCustomer({ ...newCustomer, addresses: e.target.value })}
                        placeholder="Địa chỉ"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <button
                        onClick={handleCreateCustomer}
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        {isCreating ? 'Đang tạo tài khoản...' : 'TẠO TÀI KHOẢN'}
                    </button>
                </div>
            )}
        </div>
    );
};

// Helper function to determine color based on package status
const getStatusColor = (status) => {
    switch (status) {
        case 'Đang giao':
            return 'bg-yellow-500 text-white';
        case 'Đã giao':
            return 'bg-green-500 text-white';
        case 'Chờ xử lý':
            return 'bg-blue-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

export default Tracking;
