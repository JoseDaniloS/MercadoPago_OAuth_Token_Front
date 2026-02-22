import { CircleUser, Clock, Link2, LogOut, Settings } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../components/Button";
import TextUppercase from "../components/TextUppercase";
import { AuthUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingPage from "../pages/LoadingPage";
import { truncateString } from "../utils/StringUtils";

interface HeaderDashboardProps {
  userCognito?: AuthUser;
  signOut?: () => void;
}

function HeaderDashboard({ userCognito, signOut }: HeaderDashboardProps) {
  const [open, setOpen] = useState(false);
  const email = userCognito?.signInDetails?.loginId;

  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <header className="w-full p-3 flex gap-5 justify-between items-center bg-charcoal/50">
      <div className="flex items-center gap-3">
        <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-primary/20 border text-primary border-primary/50 rounded">
          <Clock />
        </div>
        <p className="uppercase text-xl max-md:text-[16px] text-slate-100 font-extrabold">
          CHRONOS<span className="text-primary">PAY</span>
        </p>
        <div>
          <button onClick={() => handleNavigate("/transactions")}>
            Transações
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-2 py-1 flex gap-2 items-center font-bold uppercase text-xs bg-green-400/20 border text-green-400 border-green-400/50 rounded">
          <p>{user?.mp ? "Conta conectada" : "Conta não conectada"}</p>
        </div>

        <div className="relative">
          <button
            aria-expanded={open}
            aria-label="Abrir menu de usuário"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full cursor-pointer overflow-hidden shrink-0 bg-amber-200 h-10 w-10 flex items-center justify-center"
          />

          {open && (
            <div className="absolute right-0 top-12 rounded-2xl text-start flex flex-col gap-3 p-5 min-w-64 glass-card text-white z-20">
              <div className="w-full flex items-center gap-3">
                <div className="rounded-full bg-amber-200 aspect-square h-10 w-10" />
                <div className="w-full">
                  <p className="font-bold">{truncateString(user?.name, 20)}</p>
                  <p className="text-text-gray text-sm">{email}</p>
                </div>
              </div>

              <div className="w-full border-t border-text-gray/20 py-3 text-left flex flex-col gap-3">
                <TextUppercase>Integrações</TextUppercase>
                <Button.Root
                  onClick={() => handleNavigate("/oauth/mercadopago")}
                  className="py-3 text-midnight-dark px-2.5"
                >
                  <Button.Icon icon={Link2} />
                  {user?.mp
                    ? "Ver Credenciais Mercado Pago"
                    : "Conectar Mercado Pago"}
                </Button.Root>
              </div>

              <div className="w-full border-t border-b border-text-gray/20 py-3 flex flex-col gap-3">
                <button
                  onClick={() => handleNavigate("/perfil")}
                  className="text-text-gray w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md"
                >
                  <CircleUser size={16} />
                  Perfil
                </button>

                <button
                  onClick={() => handleNavigate("/settings")}
                  className="text-text-gray w-full flex items-center cursor-pointer hover:bg-text-gray/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md"
                >
                  <Settings size={16} />
                  Configurações
                </button>
              </div>

              <button
                onClick={signOut}
                className="text-red-500/70 flex w-full items-center cursor-pointer hover:bg-red-500/20 transition-all duration-200 gap-2 px-3 py-2.5 font-bold rounded-md"
              >
                <LogOut size={16} />
                Sair da conta
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(HeaderDashboard);
