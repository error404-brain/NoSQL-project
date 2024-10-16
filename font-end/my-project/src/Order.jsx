import React, { useState } from "react";
import {
  createOrder,
  deleteOrder,
  updateOrderWithCode,
  searchOrders,
} from "./api"; // Import API từ backend

const OrderManagement = () => {
  const [newOrder, setNewOrder] = useState({
    orderCode: "",
    customerCode: "",
    receiverCode: "",
    packages: "",
    orderStatus: "Đang xử lý",
  });
  const [searchOrderCode, setSearchOrderCode] = useState(""); // Mã đơn hàng cần tra cứu
  const [foundOrder, setFoundOrder] = useState(null); // Đơn hàng tìm thấy
  const [editingOrder, setEditingOrder] = useState(null); // Đơn hàng đang chỉnh sửa
  const [message, setMessage] = useState("");

  // Hàm tạo đơn hàng
  const handleCreateOrder = async () => {
    try {
      const createdOrder = await createOrder(newOrder); 
      const orderCode = createdOrder.orderCode;
      const packagesArray = newOrder.packages.split(",");
      await updatePackageWithOrderCode(orderCode, packagesArray); 
      setMessage("Đơn hàng và gói hàng đã được tạo và cập nhật thành công!");
      setNewOrder({
        orderCode: "",
        customerCode: "",
        receiverCode: "",
        packages: "",
        orderStatus: "Đang xử lý",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm tra cứu đơn hàng
  const handleSearchOrder = async () => {
    try {
      const result = await searchOrders({ orderCode: searchOrderCode });
      if (result.length === 0) {
        setMessage("Không tìm thấy đơn hàng.");
        setFoundOrder(null);
      } else {
        setFoundOrder(result[0]); // Lấy đơn hàng đầu tiên tìm thấy
        setMessage("");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra khi tìm kiếm đơn hàng.");
    }
  };

  // Hàm cập nhật đơn hàng
  const handleUpdateOrder = async () => {
    try {
      await updateOrderWithCode(foundOrder);
      setMessage("Đơn hàng đã được cập nhật thành công!");
      setEditingOrder(null);
      setFoundOrder(null); // Reset tìm kiếm sau khi cập nhật
    } catch (error) {
      setMessage("Có lỗi xảy ra khi cập nhật đơn hàng.");
    }
  };

  // Hàm xóa đơn hàng
  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(foundOrder.orderCode);
      setMessage("Đơn hàng đã được xóa thành công!");
      setFoundOrder(null); // Reset tìm kiếm sau khi xóa
    } catch (error) {
      setMessage("Có lỗi xảy ra khi xóa đơn hàng.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">Quản lý đơn hàng</h2>

      {/* Form thêm đơn hàng */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg mb-4 text-indigo-600">Thêm đơn hàng mới</h3>
        <input
          type="text"
          value={newOrder.orderCode}
          onChange={(e) => setNewOrder({ ...newOrder, orderCode: e.target.value })}
          placeholder="Mã đơn hàng"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          value={newOrder.customerCode}
          onChange={(e) => setNewOrder({ ...newOrder, customerCode: e.target.value })}
          placeholder="Mã khách hàng"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          value={newOrder.receiverCode}
          onChange={(e) => setNewOrder({ ...newOrder, receiverCode: e.target.value })}
          placeholder="Mã người nhận"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          value={newOrder.packages}
          onChange={(e) => setNewOrder({ ...newOrder, packages: e.target.value })}
          placeholder="Mã gói hàng (cách nhau bằng dấu phẩy)"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <select
          value={newOrder.orderStatus}
          onChange={(e) => setNewOrder({ ...newOrder, orderStatus: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Hủy">Hủy</option>
        </select>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition duration-200"
        >
          Thêm đơn hàng
        </button>
      </div>

      {/* Form tra cứu đơn hàng */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg mb-4 text-indigo-600">Tra cứu đơn hàng</h3>
        <input
          type="text"
          value={searchOrderCode}
          onChange={(e) => setSearchOrderCode(e.target.value)}
          placeholder="Nhập mã đơn hàng"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleSearchOrder}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-500 transition duration-200"
        >
          Tìm kiếm đơn hàng
        </button>

        {/* Hiển thị thông tin đơn hàng sau khi tra cứu */}
        {foundOrder && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-indigo-600 mb-4">Thông tin đơn hàng</h4>
            <p><strong>Mã đơn hàng:</strong> {foundOrder.orderCode}</p>
            <p><strong>Mã khách hàng:</strong> {foundOrder.customerCode}</p>
            <p><strong>Mã người nhận:</strong> {foundOrder.receiverCode}</p>
            <p><strong>Trạng thái:</strong> {foundOrder.orderStatus}</p>

            {/* Nút sửa và xóa */}
            <button
              onClick={() => setEditingOrder(foundOrder)}
              className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition duration-200 mb-2"
            >
              Sửa đơn hàng
            </button>
            <button
              onClick={handleDeleteOrder}
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-500 transition duration-200"
            >
              Xóa đơn hàng
            </button>
          </div>
        )}
      </div>

      {/* Hiển thị form sửa nếu đang chỉnh sửa đơn hàng */}
      {editingOrder && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4 text-indigo-600">Sửa đơn hàng</h3>
          <input
            type="text"
            value={editingOrder.orderCode}
            onChange={(e) => setEditingOrder({ ...editingOrder, orderCode: e.target.value })}
            placeholder="Mã đơn hàng"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="text"
            value={editingOrder.customerCode}
            onChange={(e) => setEditingOrder({ ...editingOrder, customerCode: e.target.value })}
            placeholder="Mã khách hàng"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="text"
            value={editingOrder.receiverCode}
            onChange={(e) => setEditingOrder({ ...editingOrder, receiverCode: e.target.value })}
            placeholder="Mã người nhận"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="text"
            value={editingOrder.packages}
            onChange={(e) => setEditingOrder({ ...editingOrder, packages: e.target.value })}
            placeholder="Mã gói hàng (cách nhau bằng dấu phẩy)"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <select
            value={editingOrder.orderStatus}
            onChange={(e) => setEditingOrder({ ...editingOrder, orderStatus: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          >
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Đang giao">Đang giao</option>
            <option value="Đã giao">Đã giao</option>
            <option value="Hủy">Hủy</option>
          </select>

          <button
            onClick={handleUpdateOrder}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition duration-200"
          >
            Cập nhật đơn hàng
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default OrderManagement;
