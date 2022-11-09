import TinderCard from 'react-tinder-card'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import { AiOutlineLogout, AiFillHeart } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import {IoMdClose} from 'react-icons/io'
import {AiOutlineRedo} from 'react-icons/ai'

const Dashboard = () => {

  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [user, setUser] = useState(null)
  const [showChats, setShowChats] = useState(false)
  const [filterArray, setFilterArray] = useState([])
  const userId = cookies.UserId
  const url= 'https://tinder.adaptable.app/'

  /**-----------**/

  const [currentIndex, setCurrentIndex] = useState(userId.length - 1)

  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(userId.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < userId.length - 1

  /*get the user data*/
  const getUser = async () => {
    try {
      const response = await axios.get( url + 'user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  /*_____________________________*/

  const getGenderedUser = async () => {
    try {
      const response = await axios.get(url + 'gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (user) {
      getGenderedUser()
      
    }
  }, [user])



  const updateMaches = async (matchedUserId) => {
    try {
      await axios.put(url + 'addmatch', {
        userId,
        matchedUserId

      })
      getUser()
    } catch (error) {
      console.log(error)
    }
  }


  const swiped = (direction, swipedUserId, index) => {

    if (direction === 'right') {
      updateMaches(swipedUserId)
      updateCurrentIndex(index - 1)
    }
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
}



  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    

    
  }



  const swipe = async (dir) => {
    if ( currentIndex <= userId.length ) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }






  /*____________________________*/

  const matcheIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

  const filterUser = genderedUsers?.filter(
    genderedUsers => !matcheIds.includes(genderedUsers.user_id)
    ) 

    
    
    

  const logout = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
  }

  return (
    <>

      {user
        && <div className="dashboard">

          <ChatContainer user={user} showChats={showChats} setShowChats={setShowChats} />
          <div className="swiper-container">

            <div className='mobile-nav'>
              <BsPersonCircle title='profile' className='profile-menu' onClick={() => setShowChats(true)} />
              <AiOutlineLogout title="Log Out" className="log-out-two" onClick={logout} />
            </div>


            <div className='container'>
              <div className="card-container">
                {filterUser?.map((genderedUsers, index) =>
                  <TinderCard className='swipe'
                    ref={childRefs[index]}
                    key={genderedUsers.first_name}
                    preventSwipe={["up", "down"]}
                    onSwipe={(dir) => swiped(dir, genderedUsers.user_id, index)}
                    onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}>
                    <div style={{ backgroundImage: 'url(' + genderedUsers.url + ')' }}
                      className='card'>
                      <h3>{genderedUsers.first_name}</h3>
                    </div>
                  </TinderCard>
                )}
                <div className='swipe-buttons'>
                  <IoMdClose className='swipe-button' onClick={() => swipe('left')}/>
                  <AiOutlineRedo className='swipe-button'  onClick={() => goBack()}/>
                  <AiFillHeart className='swipe-button' onClick={() => swipe('right')} />
                </div>
              </div>
            </div>
            
          </div>

        </div>}
    </>
  )

}

export default Dashboard