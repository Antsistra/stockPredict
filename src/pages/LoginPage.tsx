import AuthLayout from "@/components/layouts/authLayout";
import LoginRedirect from "@/components/fragments/LoginRedirect";

export default function LoginPage() {
  return (
    <>
      <LoginRedirect />
      <div className="min-h-screen select-none bg-white dark:bg-gray-900">
        <AuthLayout />
      </div>
    </>
  );
}
