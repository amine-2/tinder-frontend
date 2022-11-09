import { useCookies } from "react-cookie"
import {AiOutlineLogout}from 'react-icons/ai'

const ChatHeader = ({user}) => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
    }

    return (
        <div className="chat-header">
            <div className="profile">
                <div className="img-container">
                    <img src ={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
            </div>
            
            <AiOutlineLogout title="Log Out" className="log-out" onClick={logout}/>
        </div>
    )
}

export default ChatHeader