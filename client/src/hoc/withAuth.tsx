import { useEffect } from "react"
import { useAppSelector } from "../hook"
import { useNavigate } from "react-router-dom"

export const withAuth = WrappedComponent => {

    const AuthComponent = (props: any) => {
        const { id, opt_enabled, opt_validated } = useAppSelector(state => state.auth)
        const navigate = useNavigate()

        useEffect(() => {
            if (id == "") {
                navigate('/login');

            } else {
                if (opt_enabled && !opt_validated) {
                    navigate("/two-factor-auth")

                }
            }

        }, [id, navigate, opt_enabled, opt_validated]);
        return <WrappedComponent {...props} />
    }
    return AuthComponent;

}