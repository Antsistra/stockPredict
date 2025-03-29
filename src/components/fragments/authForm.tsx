import { useState } from "react";
import { LoginForm } from "@/components/form/loginForm";
import RegisterForm from "@/components/form/registerForm";
function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);
  const handleRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <>
      {isRegister ? (
        <>
          <RegisterForm />
          <div className="text-center text-sm">
            Have An Account?{" "}
            <a
              className="underline underline-offset-4 hover:cursor-pointer"
              onClick={handleRegister}
            >
              Sign In
            </a>
          </div>
        </>
      ) : (
        <>
          <LoginForm />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              className="underline underline-offset-4 hover:cursor-pointer"
              onClick={handleRegister}
            >
              Sign up
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default AuthForm;
