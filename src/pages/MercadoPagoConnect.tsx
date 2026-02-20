import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchOAuthMercadoPago } from "../api/fetchOAuthMercadoPago";
import TextUppercase from "../components/TextUppercase";
import { ArrowRight, CheckCircle, Info, KeyRound } from "lucide-react";
import CopyButton from "../components/copyButton";
import { Button } from "../components/Button";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { AuthUser } from "aws-amplify/auth";

interface OAuthData {
  access_token: string;
  refresh_token?: string;
  user_id?: string;
}

export interface UserAmplify {
  user?: AuthUser;
}

export default function MercadoPagoConnect({ user }: UserAmplify) {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code") || "";
  const CLIENT_ID = "1549445475571223";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [oAuthData, setOAuthData] = useState<OAuthData>({
    access_token: "",
  });
  const redirectUri = useMemo(
    () => `${window.location.origin}/oauth/mercadopago`,
    [],
  );

  useEffect(() => {
    if (!code) {
      window.location.href = `https://auth.mercadopago.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`;
      return;
    }

    const sendCode = async () => {
      try {
        const userId = String(user?.userId);
        setLoading(true);
        const response = await fetchOAuthMercadoPago(code, userId);
        setOAuthData(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    sendCode();
  }, [code, redirectUri]);
  if (loading) {
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
          {/* Access Token */}
          <div className="w-full">
            <TextUppercase className="text-primary">ACCESS TOKEN</TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={oAuthData.access_token}
              />
              <CopyButton value={oAuthData.access_token} />
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
                value={oAuthData.refresh_token || ""}
              />
              <CopyButton value={oAuthData.refresh_token || ""} />
            </div>
          </div>

          {/* User ID */}
          <div className="w-full">
            <TextUppercase className="text-primary">USER ID</TextUppercase>
            <div className="inputs flex gap-3 hover:bg-primary/20 transition-all duration-200">
              <KeyRound />
              <input
                className="w-full focus:outline-none"
                readOnly
                value={oAuthData.user_id || ""}
              />
              <CopyButton value={oAuthData.user_id || ""} />
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

          <Button.Root className="justify-center text-charcoal">
            Voltar para o Dashboard
            <Button.Icon className="text-charcoal w-4" icon={ArrowRight} />
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
