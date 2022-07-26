import React, { useState, useEffect } from 'react'
import UserNavbar from './UserNavbar'
import { Link, useNavigate } from 'react-router-dom'

const baseUrl = 'https://meal-app-pp.herokuapp.com'

const Navbar = () => {  
    const userToken = localStorage.getItem('userToken') 
    const [userEmail, setUserEmail] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${baseUrl}/auth/checkUser/${userToken}`)
            .then(res => res.json())
            .then(data => {
              console.log(data.response)
              if (data.response === null) {
                navigate('/')
              } else {
                setUserEmail(data.response.email)
              }
            })
            .catch(err => console.log(err))
      }, [])

    return (
        userToken === null ?
            <div className='d-flex justify-content-end p-2 bg-secondary mb-3'>
                <Link to="/signup" className="m-2 text-decoration-none foodSearch_link">Sign up</Link>
                <Link to="/login" className="m-2 text-decoration-none foodSearch_link">Log in</Link>
            </div> 
            :
            <UserNavbar userEmail={userEmail} />
    )
    
}

export default Navbar