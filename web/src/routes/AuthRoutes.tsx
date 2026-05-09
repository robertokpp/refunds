import { Routes, Route } from "react-router";

import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signUp";

import { AuthLayout } from "../components/AuthLayout";
import { NotFound } from "../pages/NotFound";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}
