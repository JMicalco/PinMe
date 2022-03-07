import React from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import Video from '../assets/video.mp4'
import Pin from "../assets/pin_2.png"
import { client } from "../client"

const Login = () => {
  const navigate = useNavigate()

  const responseGoogle =  (response: GoogleLoginResponse | GoogleLoginResponseOffline| any) => {

    localStorage.setItem('user', JSON.stringify(response.profileObj))

    const { name, googleId, imageUrl } = response.profileObj

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate("/", {replace: true})
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
        src={Video}
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className="flex flex-row justify-center p-5">
            <img src={Pin} width="50px" alt="logo" />
            <h1 className="text-white font-sans text-4xl" >PinMe</h1>
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle
                    className="mr-3"
                  />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login