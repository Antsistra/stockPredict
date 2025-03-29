import { ChartCandlestick } from "lucide-react";
import AuthForm from "@/components/fragments/authForm";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 select-none">
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-neutral-background">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/ " className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ChartCandlestick className="size-4" />
            </div>
            StockPredict
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <div className="flex justify-end">
              <Link
                to={"/"}
                className="rounded-full p-2 text-muted-foreground hover:text-primary"
              >
                <MdCancel size={28} />
              </Link>
            </div>
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://picsum.photos/1080/1080"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
