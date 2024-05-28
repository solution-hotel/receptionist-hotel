"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser } from "@/store/reducers/userloginReducer";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { loginApi } from "./../../utils/api/receptionist";
import FadeLoader from "react-spinners/FadeLoader";
import ClipLoader from "react-spinners/ClipLoader";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("........");
      setLoading(true);
      const user = await loginApi(email, password);
      console.log("data user login", user);
      if (user.Data.role != 2) {
        console.log("Lỗi error", user.Data.role);
        router.push("/403Forbidden");
        return;
      }
      dispatch(setUser(user.Data));
      setTimeout(async () => {
        setLoading(false);
      }, 5000);
      router.push("/dashboard/receptionist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen background flex justify-center items-center relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          {/* <FadeLoader color="#36d7b7" /> */}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
