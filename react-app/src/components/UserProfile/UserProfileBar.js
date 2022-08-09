import LogoutButton from "../auth/LogoutButton";
import { useDispatch, useSelector } from "react-redux"

const UserProfileBar = () => {
    const sessionUser = useSelector(state => state.session.user);
    return(
        <>
            <div>
                <img src={sessionUser.profile_pic}></img>
            </div>
            <div>
                <p>{sessionUser.username}</p>
            </div>
            <div>
                <LogoutButton />
            </div>
        </>
    )
}

export default UserProfileBar