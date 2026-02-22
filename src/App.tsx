import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import components from "./cognito/components";
import "./styles/cognito.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { formFields } from "./cognito/formFields.js";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { AuthUser } from "aws-amplify/auth";
import HeaderDashboard from "./layout/HeaderDashboard";
import Transactions from "./pages/Transactions";
import MercadoPagoConnect from "./pages/MercadoPagoConnect";
import { AuthProvider } from "./context/AuthContext";

Amplify.configure(outputs);

function AppRoutes({
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
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="tech-grid h-full min-h-screen flex items-center justify-center">
      <Authenticator
        className="p-6"
        formFields={formFields}
        socialProviders={["google"]}
        components={components}
      >
        {({ user, signOut }) => (
          <AuthProvider userCognito={user}>
            <BrowserRouter>
              <div className="w-full">
                <HeaderDashboard signOut={signOut} userCognito={user} />
                <AppRoutes user={user} signOut={signOut} />
              </div>
            </BrowserRouter>
          </AuthProvider>
        )}
      </Authenticator>
    </div>
  );
}
