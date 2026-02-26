export default function IsMpConnected({ mpConnected }: { mpConnected: boolean }) {
    return (
        <div className={`px-3 py-1.5 flex gap-2 items-center font-bold uppercase text-xs rounded-full border transition-colors ${mpConnected
            ? "bg-green-400/10 border-green-400/30 text-green-400"
            : "bg-red-400/10 border-red-400/30 text-red-400"
            }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${mpConnected ? "bg-green-400 animate-pulse" : "bg-red-400 animate-ping"}`} />
            <p>{mpConnected ? "Conta conectada" : "Conta não conectada"}</p>
        </div>
    )
}