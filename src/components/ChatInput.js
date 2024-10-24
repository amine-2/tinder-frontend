import axios from "axios"
import { useState } from "react"
import {RiSendPlaneFill} from 'react-icons/ri'



const ChatInput = ({user, clickedUser, getUsersMessages, getClickedUserMessages}) => {
    const [textArea, setTextArea] = useState('')
    const userId= user?.user_id
    const clickedUserId= clickedUser?.user_id
    const url= 'https://tinder-backend-1.onrender.com'

    const addMessage= async () =>{
        const message = {
            message: textArea,
            from_userId: userId,
            to_userId: clickedUserId,
            timestamp: new Date().toISOString()
        }
        try{
            await axios.post(url + 'message', {message})
            getUsersMessages()
            getClickedUserMessages()
            setTextArea('')
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="chat-input">
            <textarea value={textArea}
                onChange=
                {(e) => setTextArea(e.target.value)} />
            
             <RiSendPlaneFill title="Send" className="send-button"  onClick={addMessage}/>
        </div>
    )
}

export default ChatInput

