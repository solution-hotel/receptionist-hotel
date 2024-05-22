import React from "react";

const LoginPage = () => {
  return (
    <div className="w-screen h-screen background flex justify-center items-center">
      <div
        className="w-96 h-96 flex flex-col justify-center items-center"
        style={{ background: "rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}
      >
        <div className="text-3xl mr-auto mx-24 my-4 flex">Login</div>
        <div>
          <div>
            <div className="mb-6">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:border-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
                required
              />
            </div>
          </div>
          <div className="text-sm text-center my-4 font-light hover:text-blue-500 cursor-pointer">
            Forgot Password?
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white btn-login hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
