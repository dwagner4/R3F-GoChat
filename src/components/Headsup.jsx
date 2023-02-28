import React, { useContext } from 'react'
import { useActor } from "@xstate/react";

import { AppContext } from '../App.jsx'

export const Headsup = () =>
{
  const appServices = useContext(AppContext)
  const [ state, send, localservice ] = useActor(appServices.appMachineService)

  return (
    <div>Yoho {state.value}</div>
  )

}