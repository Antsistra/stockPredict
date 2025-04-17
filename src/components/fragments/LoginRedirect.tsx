import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "@/lib/supabase";

const LoginRedirect = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
      } else {
        setUser(data?.user);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return null; // or a loading spinner if you prefer
  }

  return user ? <Navigate to="/dashboard" replace /> : null;
};

export default LoginRedirect; 