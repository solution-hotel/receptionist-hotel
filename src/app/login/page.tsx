"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "@/store/reducers/userloginReducer";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { loginApi } from "./../../utils/api/receptionist";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const user = await loginApi(email, password);
      if (user.Data.role != 2) {
        router.push("/403Forbidden");
        return;
      }
      dispatch(setUser(user.Data));
      setTimeout(async () => {
        setLoading(false);
      }, 5000);
      Swal.fire({
        title: "Thành công!",
        text: "Đăng nhập thành công.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setLoading(false);
      router.push("/dashboard/receptionist");
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Thất bại!",
        text: "Đăng nhập thất bại. Vui lòng thử lại sau.",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen background flex justify-center items-center relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <ClipLoader color="#36d7b7" />
        </div>
      )}
      <div
        className="w-96 h-96 flex flex-col justify-center items-center"
        style={{ background: "rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}
      >
        <div className="text-3xl mr-auto mx-24 my-4 flex">Đăng nhập</div>
        <div>
          <div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4.5c-4.82 0-8.8 3.5-10 8 1.2 4.5 5.18 8 10 8s8.8-3.5 10-8c-1.2-4.5-5.18-8-10-8zM12 18.5c-3.45 0-6.5-2.68-7.42-6 .93-3.32 4-6 7.42-6s6.5 2.68 7.42 6c-.92 3.32-3.97 6-7.42 6zM12 8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM12 14c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14 12 14z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 6c3.53 0 6.43 2.29 7.4 5.5-.97 3.21-3.87 5.5-7.4 5.5s-6.43-2.29-7.4-5.5C5.57 8.29 8.47 6 12 6zM12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>
          <div className="text-sm text-center my-4 font-light hover:text-blue-500 cursor-pointer">
            Quên mật khẩu?
          </div>
        </div>
        <div>
          <button
            onClick={handleLogin}
            type="button"
            className="text-white btn-login hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ĐĂNG NHẬP
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
