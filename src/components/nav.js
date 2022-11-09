import alogo from '../images/tinder-a.png'
import blogo from '../images/tinder-b1.png'

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignup }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignup(false)
    }

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? blogo : alogo} />
            </div>

            {!authToken && !minimal &&
                <button className='nav-button'
                    onClick={handleClick}
                    disabled={showModal}> Log in 
                </button>
            }
        </nav>
    )
}
export default Nav