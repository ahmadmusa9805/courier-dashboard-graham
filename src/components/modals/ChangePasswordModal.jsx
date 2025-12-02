import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUpdateUserByIdMutation } from "../../redux/features/user/userApi";
import { useUpdateCourierMutation } from "../../redux/features/couriers/couriersApi";

const ChangePasswordModal = ({ user, onClose, userType }) => {
  const [password, setPassword] = useState("");

  const [updateUser, { isLoading: isUserUpdating }] = useUpdateUserByIdMutation();
  const [updateCourier, { isLoading: isCourierUpdating }] = useUpdateCourierMutation();

  const handlePasswordChange = async () => {
    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      const updateData = { id: user._id, password };

      if (userType === "courier") {
        await updateCourier(updateData).unwrap();
      } else {
        // Default to user update
        await updateUser(updateData).unwrap();
      }

      toast.success("Password changed successfully");
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  const isLoading = isUserUpdating || isCourierUpdating;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="bg-white p-6 rounded shadow-lg w-[350px]">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <p className="text-sm text-gray-600 mb-2">User: {user.email}</p>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
