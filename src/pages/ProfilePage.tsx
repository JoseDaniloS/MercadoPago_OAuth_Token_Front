import { Building2, Lock, Upload } from "lucide-react";
import { Button } from "../components/Button";
import TextUppercase from "../components/TextUppercase";
import { useAuth } from "../context/AuthContext";
import { InputHTMLAttributes, useRef } from "react";
import { useImageUpload } from "../utils/HandleImageChange";
import LoadingPage from "./LoadingPage";
import { AuthUserDynamo } from "../types/auth";



function Field({ label, type = "text", placeholder, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <TextUppercase>{label}</TextUppercase>
            <input
                {...rest}
                type={type}
                placeholder={placeholder}
                className="inputs text-white focus:outline-none"
            />
        </div>
    );
}

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const { handleImageChange, imageUrl } = useImageUpload()
    const inputRef = useRef<HTMLInputElement>(null)
    if (isLoading) {
        return <LoadingPage />
    }
    return (
        <div className="min-h-screen">
            <div className="max-w-6xl flex flex-col gap-10 p-6">
                <input type="file" ref={inputRef} accept="image/*" className="hidden" onChange={handleImageChange} />

                {/* Foto de perfil */}
                <div className="glass-card flex max-md:flex-col gap-10 p-10 rounded-xl">
                    <div className="w-32 h-32 rounded-2xl bg-text-gray/20 shrink-0 overflow-hidden border-2 border-primary">
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Foto de perfil"
                                className="w-full h-full object-cover "
                            />
                        )}
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-white font-bold text-xl">LOGO da sua empresa</h1>
                        <p className="text-text-gray text-sm">
                            Formatos recomendados: JPG, PNG ou WEBP. <br />
                            Tamanho máximo de 2MB. Dimensões ideais 400x400px.
                        </p>
                        <div className="flex max-md:flex-col gap-4">
                            <Button.Root onClick={() => inputRef.current?.click()} className="text-black p-3 rounded-full">
                                <Button.Icon icon={Upload} />
                                Trocar Foto
                            </Button.Root>
                            <Button.Root className="bg-transparent p-3 rounded-full border hover:bg-text-gray/20">
                                Remover
                            </Button.Root>
                        </div>
                    </div>
                </div>

                <div className="flex w-full gap-10 max-md:flex-col">

                    {/* Informações Pessoais */}
                    <div className="glass-card flex-1 flex flex-col gap-6 p-10 rounded-xl">
                        <div className="border-b border-text-gray/20 pb-3 flex gap-3 items-center">
                            <Building2 className="text-primary" />
                            <h2 className="text-white font-bold">Informações Pessoais</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Field label="Nome completo" placeholder="Seu nome" readOnly disabled value={user?.name} />
                            <Field label="E-mail profissional" type="email" readOnly disabled placeholder="seu@email.com" value={user?.email} />

                        </div>
                    </div>

                    {/* Dados Corporativos */}
                    <div className="glass-card flex-1 flex flex-col gap-6 p-10 rounded-xl">
                        <div className="border-b border-text-gray/20 pb-3 flex gap-3 items-center">
                            <Building2 className="text-primary" />
                            <h2 className="text-white font-bold">Dados Corporativos</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Field label="Nome da empresa" type="text" placeholder="Chronos Pay Ltda" value={user?.company.name || ""} />
                            <Field label="website oficial" type="text" placeholder="https://www.chronospay.com.br" value={user?.company.website} />
                            <Field label="setor de atuação" type="text" placeholder="Pagamentos Digitais" value={user?.company.industry || ""} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}