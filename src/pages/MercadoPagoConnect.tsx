import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"

export default function MercadoPagoConnect() {
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code");
    const CLIENT_ID = "1549445475571223"
    const redirectUri = "https://192.168.1.36:5173/oauth/mercadopago"

    useEffect(() => {
        window.location.href = `https://auth.mercadopago.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`
    }, [])

}