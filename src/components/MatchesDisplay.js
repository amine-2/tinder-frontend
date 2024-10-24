import axios from 'axios'
import { useState, useEffect } from 'react'

const MachesDisplay = ({matches, setClickedUser}) => {

    const [matchedProfiles, setMatchedProfiles] = useState(null)

    const matchedUserIds = matches.map(({user_id})=> user_id)
    const url= 'https://tinder-backend-1.onrender.com'

    const getMatches = async ()=>{
   try {
      const response= await axios.get(url+'users', {
        params: {userIds: JSON.stringify(matchedUserIds)}
      })
      setMatchedProfiles(response.data) 

    }catch (error){
        console.log(error);
    }
    
}

useEffect(() => {
  getMatches()
}, [matches])



    return (
        <div className="matches-display">
           {matchedProfiles?.map((match,matches)=>(
            <div key={{matches}} className='match-card'  onClick={() => setClickedUser(match)}>
                <div className='macth-container'>
                    <img src={match?.url} alt={match?.first_name + ' profile'} />
                </div>
                <h3>{match?.first_name} </h3>
            </div>
           ))}
        </div>
    )
}

export default MachesDisplay
