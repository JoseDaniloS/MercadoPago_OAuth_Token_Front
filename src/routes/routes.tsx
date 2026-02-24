import { AuthUser } from "aws-amplify/auth";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MercadoPagoConnect from "../pages/MercadoPagoConnect";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import ProfilePage from "../pages/ProfilePage";

export default function AppRoutes({
  user,
  signOut,
}: {
  user?: AuthUser;
  signOut?: () => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  if (!user || !signOut) return null;

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/oauth/mercadopago"
        element={<MercadoPagoConnect userCognito={user} />}
      />
      <Route
        path="/transactions"
        element={<Transactions userCognito={user} />}
      />
      <Route path="/reports" element={<div>Relatórios (em breve)</div>} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<div>Configurações (em breve)</div>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}