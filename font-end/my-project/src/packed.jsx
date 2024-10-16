import React, { useState } from "react";
import { createPackage } from "./api"; // Import API từ backend

const AddPackage = () => {
  const [newPackage, setNewPackage] = useState({
    packageCode: "",
    packageDescription: "",
    trackingNumber: "",
    packageStatus: "Đang xử lý",
    orderCode: null, // Để giá trị mặc định là null
  });

  const [message, setMessage] = useState("");

  const handleCreatePackage = async () => {
    try {
      if (!newPackage.packageCode || !newPackage.packageDescription || !newPackage.trackingNumber) {
        setMessage("Vui lòng nhập đầy đủ thông tin bưu phẩm.");
        return;
      }

      await createPackage(newPackage);
      setMessage("Bưu phẩm đã được tạo thành công!");

      setNewPackage({
        packageCode: "",
        packageDescription: "",
        trackingNumber: "",
        packageStatus: "Đang xử lý",
        orderCode: null, // Reset về null sau khi thêm
      });
    } catch (error) {
      setMessage("Có lỗi xảy ra khi tạo bưu phẩm.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-700">
        Thêm Bưu Phẩm Mới
      </h2>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-semibold text-lg mb-4 text-indigo-600">
          Thông tin bưu phẩm
        </h3>

        <input
          type="text"
          value={newPackage.packageCode}
          onChange={(e) =>
            setNewPackage({ ...newPackage, packageCode: e.target.value })
          }
          placeholder="Mã bưu phẩm"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          value={newPackage.packageDescription}
          onChange={(e) =>
            setNewPackage({ ...newPackage, packageDescription: e.target.value })
          }
          placeholder="Mô tả bưu phẩm"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="text"
          value={newPackage.trackingNumber}
          onChange={(e) =>
            setNewPackage({ ...newPackage, trackingNumber: e.target.value })
          }
          placeholder="Mã theo dõi"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <select
          value={newPackage.packageStatus}
          onChange={(e) =>
            setNewPackage({ ...newPackage, packageStatus: e.target.value })
          }
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Hủy">Hủy</option>
        </select>

        <button
          onClick={handleCreatePackage}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition duration-200"
        >
          Thêm bưu phẩm
        </button>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default AddPackage;
