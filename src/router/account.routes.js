import {
  Layout,
  Login,
  SignUp,
  VerifyEmail,
  ForgotPassword,
  ResetPassword,
} from "@/views/account";

export default {
  path: "/",
  component: Layout,
  children: [
    { path: "", component: Login, name: "login" },
    { path: "signup", component: SignUp, name: "signup" },
    { path: "verify-email", component: VerifyEmail, name: "verify-email" },
    {
      path: "forgot-password",
      component: ForgotPassword,
      name: "forgot-password",
    },
    {
      path: "reset-password",
      component: ResetPassword,
      name: "reset-password",
    },
  ],
};
