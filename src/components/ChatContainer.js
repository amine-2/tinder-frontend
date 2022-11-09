import ChatHeader from "./ChatHeader"
import ChatDisplay from "./ChatDisplay"
import MachesDisplay from "./MatchesDisplay"
import { useState } from "react"
import {BsArrowReturnRight} from 'react-icons/bs'

const ChatContainer = ({user, showChats , setShowChats}) => {
const [clickedUser, setClickedUser] = useState(null)

if (showChats){
    document.getElementById("chat-container").style.transform = "translateX(0%)"
}

function hide() {
    setShowChats(false)
    document.getElementById("chat-container").style.transform = "translateX(-100%)"

}





    return (
        <div className="chat-container" id="chat-container">
            <BsArrowReturnRight title='return to dashboard' className='return-button' onClick={hide}/>
            <ChatHeader user={user}/>
            <div>
                <button className="option" onClick={()=> setClickedUser(null) }>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {!clickedUser && <MachesDisplay matches={user.matches} setClickedUser={setClickedUser }/>}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}

        </div>
    )
}

export default ChatContainer