import { Outlet } from "react-router-dom"
import { Button } from './ui/button'
import { useAppDispatch, useAppSelector } from "../hook"
import { LogoutAction } from "../redux/actions/auth"

const Layout = () => {
    const { id } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();

    const Logout = (id: string) => {
        dispatch(LogoutAction({ id: id })).unwrap().then(res => { window.location.href = "/login"; localStorage.clear() }).catch(() => console.log("error"))
    }
    return (
        <div className="max-w-7xl mx-auto mt-5 bg-slate h-screen">
            {id && <Button onClick={() => Logout(id)}>Logout</Button>}
            <Outlet />
        </div>
    )
}

export default Layout
