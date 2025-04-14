import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      setUser(null);
    } else {
      setUser(data?.user);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
