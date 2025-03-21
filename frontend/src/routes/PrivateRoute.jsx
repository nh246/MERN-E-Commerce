import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"

function PrivateRoute({children , role}) {

    const {user} = useSelector((state)=> state.auth)
    // console.log(user?.role)
    const location = useLocation();

    if(!user){
        alert("You must be logged in ")
        return <Navigate to="/login" state={{from: location}} replace />
    }

    if(role && user.role !== role){
        alert("Access Denied. You must be an admin")
        return <Navigate to="/login" state={{from: location}} replace />
    }

  return children
}
export default PrivateRoute