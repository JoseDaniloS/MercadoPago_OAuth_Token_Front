import { AuthUser, fetchAuthSession } from "aws-amplify/auth";
import { Clock, ShieldCheck } from "lucide-react";
import { useEffect } from "react";




interface HeaderDashboardComposition {
    signOut?: () => void,
    user?: AuthUser
}

export default function HeaderDashboard({ user, signOut }: HeaderDashboardComposition) {

    const fetchUserAttributes = async () => {
        try {
            const response = await fetchAuthSession({ forceRefresh: true })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserAttributes()
    }, [])


    return (
        <header className="w-full p-3 flex gap-5 justify-between items-center bg-charcoal/50">
            <div className="flex items-center gap-3">
                <div className="p-2 flex gap-2 items-center font-bold uppercase text-xs bg-primary/20 border text-primary border-primary/50 rounded">
                    <Clock />
                </div>
                <p className="uppercase text-xl max-md:text-[16px] text-slate-100 font-extrabold">
                    CHRONOS<span className="text-primary">PAY</span>
                </p>
            </div>
            <div className="flex gap-3">
                <div className="px-1 flex gap-2 items-center font-bold uppercase text-xs bg-green-400/20 border text-green-400 border-green-400/50 rounded-full">
                    <p>API Online</p>
                </div>
                <button onClick={signOut} className="rounded-full bg-amber-200 h-10 w-10">

                </button>
            </div>

        </header>
    );
}
