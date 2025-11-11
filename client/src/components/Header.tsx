import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <header
      className="w-full flex justify-between items-center bg-gray-200 px-6 py-3 border-b"
    >
      <h1 className="text-xl font-semibold">LMS</h1>

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
