import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import supabase from "@/lib/supabase";
import { ChartCandlestick } from "lucide-react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
export default function Navbar() {
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();
  const getUserName = async () => {
    const userId = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId.data.user?.id)
      .single();
    if (error) {
      console.error("Error fetching user name:", error.message);
    }
    if (data) {
      setName(data.name);
      console.log("User name:", data.name);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Logout successful",
        text: "You have been logged out.",
      });
    }
  };
  return (
    <nav className="bg-[#2563EB] border-gray-200 dark:bg-gray-900 select-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-white text-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
            <ChartCandlestick className="size-5" />
          </div>
          StockPredict
        </a>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border-2 ">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 c">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              GitHub
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Support
            </DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
