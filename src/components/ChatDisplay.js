import axios from "axios"
import Chat from "./Chat"
import ChatInput from "./ChatInput"
import { useState, useEffect } from "react"

const ChatDisplay = ({user, clickedUser}) => {

    const userId = user?.user_id
    const clickedUserId= clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUserMessages, setClickedUserMessages] = useState(null)
    const url= 'https://tinder.adaptable.app/'
    const getUsersMessages = async () => {
        try {
               const response = await axios.get(url + 'messages', {
                   params: { userId: userId, correspondingUserId: clickedUserId}
               })
            setUsersMessages(response.data)
           } catch (error) {
            console.log(error)
        }
       }
    const getClickedUserMessages = async () => {
        try {
               const response = await axios.get(url + 'messages', {
                   params: { userId:clickedUserId , correspondingUserId:userId }
               })
            setClickedUserMessages(response.data)
           } catch (error) {
            console.log(error)
        }
       }





       useEffect(() => {
        getUsersMessages()
        getClickedUserMessages()
    }, [])

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['id'] = user?.user_id
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    clickedUserMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['id'] = clickedUser?.user_id
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    
    return (
        <>
        
            <Chat descendingOrderMessages={descendingOrderMessages} userId={userId}/>
            <ChatInput 
            user={user}
            clickedUser={clickedUser}
            getUsersMessages={getUsersMessages} 
            getClickedUserMessages={getClickedUserMessages}
            />
        </>
    )
}

export default ChatDisplay