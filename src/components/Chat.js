const Chat = ({descendingOrderMessages, userId}) => {
  console.log(userId)
    return (
            <>
        <div className="chat">
            {descendingOrderMessages?.map((message, name) =>(
                <div key={name} className={message.id=== userId ? 'user-msg':"sender-message"}>
                    <div className="chat-message-header">
                      <div className="img-container">
                        <img src={message.img} alt= {message.name + ' profile'} />
                      </div>
                      <p >{message.name}</p>
                    </div>

                    <p className="text-message">{message.message} </p>
                </div>
            ))}
        
       </div>
            </>
    )
}

export default Chat
