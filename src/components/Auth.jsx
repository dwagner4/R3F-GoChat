import React, { useContext, useEffect, useState } from 'react'
import { useActor } from "@xstate/react";

import { auth, provider } from '../firebase-config.js'
import { signInWithPopup } from "firebase/auth"
import {signOut } from "firebase/auth"

import { AppContext } from '../App.jsx'
import Cookies from 'universal-cookie'
export const cookies = new Cookies()
import '../styles/Auth.css'

export const Auth = (props) => 
{
  const { setIsAuth } = props

  const appServices = useContext(AppContext)
  const [ state, send, raise, localservice ] = useActor(appServices.appMachineService)


  const signInWithGoogle = async (props) => 
  { try {
      const result = await signInWithPopup(auth, provider)

      cookies.set("auth-token", result.user.refreshToken)
      // setIsAuth(true)
      send({type: 'LOGIN'})
    } catch (err) {
      console.log(err)
      send({type: 'LOGIN_ERROR'})
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
    send({type: 'LOGOUT'})
    // setIsAuth(false)
    // setRoom(null)
  } 

  return (
    <div><button onClick={signUserOut} > Sign Out </button></div>
  )

}