import { Outlet } from "react-router";

import logoSVG from "../assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100">
      <main className="bg-gray-500 p-8 rounded-md flex flex-col justify-center items-center md:min-w-115.5">
        <img src={logoSVG} alt="Logo" className="mx-8" />
        <Outlet />
      </main>
    </div>
  );
}
