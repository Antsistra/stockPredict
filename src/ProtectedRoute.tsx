import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoadingPage from "@/components/fragments/LoadingPage";

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
    //test loading
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LoadingPage isLoading={loading}>
      {user ? <Outlet /> : <Navigate to="/login" replace />}
    </LoadingPage>
  );
};

export default ProtectedRoute;
