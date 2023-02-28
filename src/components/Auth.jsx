import { auth, provider } from '../firebase-config.js'
import { signInWithPopup } from "firebase/auth"
import {signOut } from "firebase/auth"

import Cookies from 'universal-cookie'
export const cookies = new Cookies()
import '../styles/Auth.css'

export const Auth = (props) => 
{
  const { setIsAuth } = props

  const signInWithGoogle = async (props) => 
  { try {
      const result = await signInWithPopup(auth, provider)

      cookies.set("auth-token", result.user.refreshToken)
      setIsAuth(true)
    } catch (err) {
      console.log(err)
    }
    
  }

  return <div className="auth">
    <p> Sign in with google to continue </p>
    <button onClick={signInWithGoogle}>Sign in with google</button>
  </div>
}

export const SignOut = (props) => 
{
  const { setIsAuth } = props

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    // setRoom(null)
  } 

  return (
    <div><button onClick={signUserOut} > Sign Out </button></div>
  )

}