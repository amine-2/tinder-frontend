import { useState } from "react"
import Nav from "../components/nav"
import {useCookies} from 'react-cookie'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Onbording = () => {
    const [cookies , setCookie , removeCookie] = useCookies (['user'])
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: false,
        gender_identity: "man",
        gender_interest: "woman",
        url: '',
        about: '',
        matches: []
    })
    const url= 'https://tinder.adaptable.app/'

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response =  await axios.put(url + 'user', {formData})
          const success = response.status === 200
          if(success) navigate ('/dashboard')
        }catch (err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav minimal={true}
                setShowModal={() => { }}
                showModal={false} />

            <div className="onbording">
                <h2>CREAT AN ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />


                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />


                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man_gender_identity"
                                type="radio"
                                name="gender_identity"
                                value={"man"}
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            />
                            <label htmlFor="man_gender_identity">Man</label>
                            <input
                                id="woman_gender_identity"
                                type="radio"
                                name="gender_identity"
                                value={"woman"}
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            />
                            <label htmlFor="woman_gender_identity">Woman</label>
                        </div>


                        <label htmlFor="show_gender">show gender on my profile</label>
                        <div className="multiple-input-container">
                            <input
                                id="show_gender"
                                type="checkbox"
                                name="show_gender"
                                onChange={handleChange}
                                checked={formData.show_gender}
                            /></div>


                        <label>show me</label>
                        <div className="multiple-input-container">
                            <input
                                id="man_gender_interest"
                                type="radio"
                                name="gender_interest"
                                value={"man"}
                                onChange={handleChange}
                                checked={formData.gender_interest === 'man'}
                            />

                            <label htmlFor="man_gender_interest">Man</label>
                            <input
                                id="woman-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value={"woman"}
                                onChange={handleChange}
                                checked={formData.gender_interest === 'woman'}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>
                            <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value={"everyone"}
                                onChange={handleChange}
                                checked={formData.gender_interest === 'everyone'}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like pets....."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit" className="submit-one"/>

                    </section>
                    <section>

                        <label htmlFor="url"> profile picture </label>
                        <input
                            id="url"
                            type="url"
                            name="url"
                            required={true}
                            onChange={handleChange}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview" />}
                        </div>
                        <input type="submit" className="submit-two"/>
                    </section>

                </form>

            </div>
        </>
    )
}
export default Onbording
