import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchOAuthMercadoPago,
  getOAuthMercadoPago,
} from "../api/fetchOAuthMercadoPago";
import TextUppercase from "../components/TextUppercase";
import { ArrowRight, CheckCircle, Info, KeyRound } from "lucide-react";
import CopyButton from "../components/copyButton";
import { Button } from "../components/Button";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { AuthUser } from "aws-amplify/auth";
import { truncateString } from "../utils/StringUtils";
import { useAuth } from "../context/AuthContext";
import { MercadoPagoIntegration } from "../types/auth";

export interface UserAmplify {
  userCognito?: AuthUser;
}

export default function MercadoPagoConnect({ userCognito }: UserAmplify) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const CLIENT_ID = "1549445475571223";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [oAuthData, setOAuthData] = useState<MercadoPagoIntegration | any>();

  const { user, isLoading } = useAuth();
  useEffect(() => {
    if (user?.mp) {
      setOAuthData(user.mp);
    }
  }, [user]);

  const navigate = useNavigate();
  const redirectUri = useMemo(
    () => `${window.location.origin}/oauth/mercadopago`,
    [],
  );

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const userId = userCognito?.userId;
        if (!userId) return;
        if (user?.mp || isLoading) return;
        // Sem code → redireciona para o Mercado Pago autorizar
        if (!code) {
          console.log("Redirecionando para Mercado Pago...");
          window.location.href = `https://auth.mercadopago.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`;
          return;
        }

        // Tem code → faz o OAuth
        setLoading(true);
        const response = await fetchOAuthMercadoPago(userId, code);
        if (response) setOAuthData(response);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    checkConnection();
  }, [code, redirectUri, userCognito, user, isLoading]);
  if (loading || isLoading) {
    return <LoadingPage />;
  }



  if (error) {
    return <ErrorPage />;
  }
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="glass-card gap-3 max-w-xl p-10 flex flex-col items-center overflow-hidden justify-center text-white">
        <CheckCircle
          className="text-primary drop-shadow-[0_0_5px_rgba(212,175,55)]"
          size={32}
        />
        <h1 className="text-primary font-bold text-2xl">
          Conta conectada com sucesso
        </h1>
        <p className="text-center text-sm text-text-gray">
          Sua integração com o Mercado Pago está ativa. As credenciais abaixo
          foram geradas e estão prontas para uso.
        </p>

        <div className="w-full flex flex-col gap-5">
          {/* Public Key*/}
          <div className="w-full">
            <TextUppercase className="text-primary">PUBLIC KEY</TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={truncateString(oAuthData?.public_key, 30) || ""}
              />
              <CopyButton value={oAuthData?.public_key || ""} />
            </div>
          </div>

          {/* Access Token */}
          <div className="w-full">
            <TextUppercase className="text-primary">ACCESS TOKEN</TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={truncateString(oAuthData?.access_token, 30)}
              />
              <CopyButton value={oAuthData?.access_token} />
            </div>
          </div>

          {/* Refresh Token */}
          <div className="w-full">
            <TextUppercase className="text-primary">
              REFRESH TOKEN
            </TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={truncateString(oAuthData?.refresh_token, 30) || ""}
              />
              <CopyButton value={oAuthData?.refresh_token || ""} />
            </div>
          </div>

          {/* User ID */}
          <div className="w-full">
            <TextUppercase className="text-primary">MERCHANT ID</TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={oAuthData?.merchant_id || ""}
              />
              <CopyButton value={oAuthData?.merchant_id || ""} />
            </div>
          </div>

          <div className="bg-primary/20 flex gap-2 border-primary/30 border p-3 rounded-md">
            <Info size={20} className="text-primary" />
            <div>
              <p className="text-primary font-bold text-sm">
                Nota de Segurança
              </p>
              <p className="text-xs">
                Estas credenciais dão acesso sensível à sua conta. Armazene-as
                em local seguro e nunca as compartilhe publicamente.
              </p>
            </div>
          </div>

          <Button.Root
            onClick={() => navigate("/dashboard")}
            className="justify-center text-charcoal"
          >
            Voltar para o Dashboard
            <Button.Icon className="text-charcoal w-4" icon={ArrowRight} />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
