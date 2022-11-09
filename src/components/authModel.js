import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import {AiOutlineCloseCircle} from 'react-icons/ai'



const AuthModal = ({ setShowModal, setIsSignup, isSignup }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPssword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies , setCookie , removeCookie] = useCookies (['user'])
    let navigate = useNavigate()

    console.log(email, password, confirmPssword)

    const handleClick = () => {
        setShowModal(false)
     

    }
    const handleSubmit = async (e) => {
      e.preventDefault();

        try {
            if (isSignup && (password !== confirmPssword)) {

                setError("password need to match")
                return

            }

           const response = await axios.post(`https://tinder.adaptable.app/${isSignup ? 'signup': 'login'}`, { email, password })

           setCookie ( 'AuthToken', response.data.token)
           setCookie ( 'UserId', response.data.userId)



            const success = response.status === 201
        if (success && isSignup) navigate('/onbording')
        if(success && !isSignup) navigate('/dashboard')

        window.location.reload()

    

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-modal">
            <AiOutlineCloseCircle className="close-tag" onClick={handleClick}/>
            <h2> {isSignup ? "CREATE AN ACCOUNT" : "LOG IN"} </h2>
            <p>By clicking on log in , You agree on the terms, Learn how we process your data in our pravicy policy and coockies policy</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isSignup && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confim password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="secondary-button" type="submit" />
                <p> {error} </p>

            </form>


            <h2>GET THE APP</h2>
        </div>
    )
}
export default AuthModal