import React, { useContext, useEffect, useState } from 'react'
import { useActor } from "@xstate/react";
import { AppContext } from '../../App.jsx'

import './Auth.css'

export const SignOut = ({ dosignout }) => {

  const appServices = useContext(AppContext)
  const [ state, send, raise, localservice ] = useActor(appServices.appMachineService)

  return <button onClick={dosignout}>Sign Out </button>
}