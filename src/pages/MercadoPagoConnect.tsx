import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { fetchOAuthMercadoPago } from "../api/fetchOAuthMercadoPago";

export default function MercadoPagoConnect() {
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code") || "";
    const CLIENT_ID = "1549445475571223"
    const redirectUri = window.location.origin + "/oauth/mercadopago"

    if (!code) {
        useEffect(() => {
            window.location.href = `https://auth.mercadopago.com.br/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectUri}`
        }, [])
    }

    useEffect(() => {
        const sendCode = async () => {
            try {
                const response = await fetchOAuthMercadoPago(code)
                console.log(response)
            } catch (error) {

            }
        }
        sendCode()
    }, [])

}