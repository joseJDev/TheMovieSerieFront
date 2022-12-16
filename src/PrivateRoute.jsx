import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { authenticated } = useSelector(state => state.user);
    return authenticated ? <Outlet /> : <Navigate to="/login" />
}
 
export default PrivateRoute;