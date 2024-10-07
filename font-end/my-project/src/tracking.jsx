import React, { useState } from 'react';
import { createCustomerwithAddress, searchCustomersByPhone, searchCustomersByEmail, searchPackages } from './api'; // Import API từ backend
import { FaUser, FaPhone, FaEnvelope, FaBox, FaShippingFast } from 'react-icons/fa'; // Import icons

const Tracking = () => {
    const [activeTab, setActiveTab] = useState('traCuu'); // Default tab is 'Tra cứu'
    const [selectedOption, setSelectedOption] = useState(''); // Search option state
    const [trackingNumbers, setTrackingNumbers] = useState(''); // State for tracking numbers
    const [phoneNumber, setPhoneNumber] = useState(''); // Customer phone number
    const [email, setEmail] = useState(''); // Customer email
    const [newCustomer, setNewCustomer] = useState({
        customerCode: '',
        customerName: '',
        phoneNumber: '',
        email: ''
    }); // Customer form data
    const [newAddresses, setNewAddresses] = useState([{
        addressCode: '',
        customerCode: '',
        receiverName: '',
        phoneNumber: '',
        addressDetails: '',
        country: '',
        postalCode: ''
    }]); // Array of addresses
    const [customerResults, setCustomerResults] = useState(null); // Customer search result
    const [packageResults, setPackageResults] = useState([]); // Package search results
    const [isSearching, setIsSearching] = useState(false); // Searching state
    const [isCreating, setIsCreating] = useState(false); // Creating state
    const [errorMessage, setErrorMessage] = useState(null); // Error message state
    const [successMessage, setSuccessMessage] = useState(null); // Success message state
    const [selectedService, setSelectedService] = useState(''); // Chọn dịch vụ

    // Handle tab switching (Tra cứu vs Dịch vụ)
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setSelectedOption(''); // Reset search option when switching tabs
    };

    // Add a new address
    const handleAddAddress = () => {
        setNewAddresses([
            ...newAddresses,
            {
                addressCode: '',
                customerCode: newCustomer.customerCode,
                receiverName: '',
                phoneNumber: '',
                addressDetails: '',
                country: '',
                postalCode: ''
            }
        ]);
    };

    // Handle address input change
    const handleAddressChange = (index, field, value) => {
        const updatedAddresses = [...newAddresses];
        updatedAddresses[index][field] = value;
        setNewAddresses(updatedAddresses);
    };

    // Create new customer with multiple addresses
    const handleCreateCustomer = async () => {
        setIsCreating(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            // Make sure each address has the same customer code
            const updatedAddresses = newAddresses.map(address => ({
                ...address,
                customerCode: newCustomer.customerCode
            }));

            // Call API to create customer with multiple addresses
            await createCustomerwithAddress(newCustomer, updatedAddresses);

            // Show success message and reset form
            setSuccessMessage('Khách hàng và địa chỉ đã được tạo thành công!');
            setNewCustomer({
                customerCode: '',
                customerName: '',
                phoneNumber: '',
                email: ''
            });
            setNewAddresses([{
                addressCode: '',
                customerCode: '',
                receiverName: '',
                phoneNumber: '',
                addressDetails: '',
                country: '',
                postalCode: ''
            }]);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Có lỗi xảy ra khi tạo khách hàng.');
        } finally {
            setIsCreating(false);
        }
    };

    // Search customers by phone number
    const handleSearchCustomersByPhone = async () => {
        setIsSearching(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const result = await searchCustomersByPhone({ phoneNumber });
            if (result.length > 0) {
                setCustomerResults(result[0]); // Expecting one customer per phone number
                setSuccessMessage('Khách hàng đã được tìm thấy.');
            } else {
                setCustomerResults(null);
                setErrorMessage('Không tìm thấy khách hàng.');
            }
        } catch (error) {
            console.error('Error searching customers:', error);
            setErrorMessage('Có lỗi xảy ra khi tìm kiếm khách hàng.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchCustomersByEmail = async () => {
        setIsSearching(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        try {
            const result = await searchCustomersByEmail({ email });
            if (result.length > 0) {
                setCustomerResults(result[0]); // Expecting one customer per phone number
                setSuccessMessage('Khách hàng đã được tìm thấy.');
            } else {
                setCustomerResults(null);
                setErrorMessage('Không tìm thấy khách hàng.');
            }
        } catch (error) {
            console.error('Error searching customers:', error);
            setErrorMessage('Có lỗi xảy ra khi tìm kiếm khách hàng.');
        } finally {
            setIsSearching(false);
        }
    };

    // Search packages by tracking number
    const handleSearchPackages = async () => {
        const packageCodes = trackingNumbers.split(',').map(code => code.trim());
        setIsSearching(true);
        setErrorMessage(null);
        try {
            const results = await searchPackages({ packageCode: packageCodes.join(',') });
            if (results.length > 0) {
                setPackageResults(results);
                setSuccessMessage('Bưu phẩm đã được tìm thấy.');
            } else {
                setPackageResults([]);
                setErrorMessage('Không tìm thấy bưu phẩm.');
            }
        } catch (error) {
            console.error('Error searching packages:', error);
            setErrorMessage('Có lỗi xảy ra khi tìm kiếm bưu phẩm.');
        } finally {
            setIsSearching(false);
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
                            <option value="khachHangDienThoai">Tra cứu khách hàng bằng điện thoại</option>
                            <option value="khachHangEmail">Tra cứu khách hàng bằng email</option>
                            <option value="buuPham">Tra cứu bưu phẩm</option>
                        </select>
                    </div>

                    {/* Tra cứu khách hàng bằng số điện thoại*/}
                    {selectedOption === 'khachHangDienThoai' && (
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

                            {/* Display error message */}
                            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                        </div>
                    )}

                    {/* Tra cứu khách hàng bằng email */}
                    {selectedOption === 'khachHangEmail' && (
                        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold mb-4">Tra cứu khách hàng</h2>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Nhập email"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />
                            <button onClick={handleSearchCustomersByEmail} className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg">
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

                            {/* Display error message */}
                            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
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

                            {/* Display error message */}
                            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                        </div>
                    )}
                </div>
            )}

            {/* Dịch vụ Section */}
            {activeTab === 'dichVu' && (
                <div className="bg-gray-100 shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Chọn loại dịch vụ</h2>
                    <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    >
                        <option value="">Chọn dịch vụ...</option>
                        <option value="createCustomer">Tạo khách hàng mới</option>
                    </select>

                    {/* Hiển thị form tạo khách hàng nếu chọn "Tạo khách hàng mới" */}
                    {selectedService === 'createCustomer' && (
                        <>
                            <h2 className="text-xl font-bold mb-4">Tạo tài khoản khách hàng mới</h2>
                            {/* Thông tin khách hàng */}
                            <input
                                type="text"
                                value={newCustomer.customerCode}
                                onChange={(e) => setNewCustomer({ ...newCustomer, customerCode: e.target.value })}
                                placeholder="Mã khách hàng"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />

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
                                type="email"
                                value={newCustomer.email}
                                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                placeholder="Email"
                                className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            />

                            <h3 className="text-lg font-bold mb-2">Thông tin địa chỉ</h3>

                            {/* Danh sách địa chỉ */}
                            {newAddresses.map((address, index) => (
                                <div key={index} className="mb-6">
                                    <input
                                        type="text"
                                        value={address.addressCode}
                                        onChange={(e) => handleAddressChange(index, 'addressCode', e.target.value)}
                                        placeholder="Mã địa chỉ"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                    <input
                                        type="text"
                                        value={address.receiverName}
                                        onChange={(e) => handleAddressChange(index, 'receiverName', e.target.value)}
                                        placeholder="Tên người nhận"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                    <input
                                        type="text"
                                        value={address.phoneNumber}
                                        onChange={(e) => handleAddressChange(index, 'phoneNumber', e.target.value)}
                                        placeholder="Số điện thoại người nhận"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                    <input
                                        type="text"
                                        value={address.addressDetails}
                                        onChange={(e) => handleAddressChange(index, 'addressDetails', e.target.value)}
                                        placeholder="Địa chỉ"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                    <input
                                        type="text"
                                        value={address.country}
                                        onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                                        placeholder="Quốc gia"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                    <input
                                        type="text"
                                        value={address.postalCode}
                                        onChange={(e) => handleAddressChange(index, 'postalCode', e.target.value)}
                                        placeholder="Mã bưu chính"
                                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                                    />
                                </div>
                            ))}

                            {/* Nút thêm địa chỉ */}
                            <button onClick={handleAddAddress} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
                                Thêm địa chỉ
                            </button>

                            {/* Nút tạo tài khoản */}
                            <button
                                onClick={handleCreateCustomer}
                                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                {isCreating ? 'Đang tạo tài khoản...' : 'TẠO TÀI KHOẢN'}
                            </button>

                            {/* Hiển thị thông báo lỗi nếu có */}
                            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

                            {/* Hiển thị thông báo thành công */}
                            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                        </>
                    )}
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
