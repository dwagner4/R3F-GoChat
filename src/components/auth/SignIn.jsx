import React, { useContext, useEffect, useState } from 'react'
import { useActor } from "@xstate/react";
import { AppContext } from '../../App.jsx'

import './Auth.css'

export const SignIn = ({ dosignin }) => {

  const appServices = useContext(AppContext)
  const [ state, send, raise, localservice ] = useActor(appServices.appMachineService)

  return <>
    <h3>{state.context.authMsg}</h3>
    <button onClick={dosignin}>Sign in </button>
  </>
}