import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset, updatePassword } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Changepassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const { isSuccess, isError, message, loading } = useAppSelector(
    (state) => state.auth
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    dispatch(
      updatePassword({
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
    );

    // Perform password update logic here

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("password changed successfully");
    }
    dispatch(reset());
  }, [dispatch, isSuccess, isError, loading, message]);

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-lg  rounded-lg shadow-lg p-8 space-y-6 w-full">
        <h1 className="text-3xl font-bold text-center mb-5">Update Password</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          <div>
            <label htmlFor="old_password_field" className="block mb-2 text-sm">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-input w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="new_password_field" className="block mb-2 text-sm">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-input w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password_field"
              className="block mb-2 text-sm"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-input w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changepassword;
