import Nav from "../components/nav";
import { useState } from "react";
import AuthModal from "../components/authModel";
import { useCookies } from "react-cookie";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(true)
    const [cookies, setCookie, removeCookie] = useState('user')

    const authToken = cookies.AuthToken;

    const clickHandle = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignup(true)
    }

    return (


        <div className="overlay">
            <Nav
                minimal={false}
                authToken={authToken}
                setShowModal={setShowModal}
                showModal={showModal}
                setIsSignup={setIsSignup}
            ></Nav>
            <div className="home">
                <h1 className="primary-title">Swipe Right</h1>
                <button className="primery-button" onClick={clickHandle}>
                    {authToken ? 'signout' : 'create an account'}
                </button>
                {showModal && (<AuthModal setShowModal={setShowModal} setIsSignup={setIsSignup} isSignup={isSignup} />)}
            </div>
        </div>
    )
}
export default Home