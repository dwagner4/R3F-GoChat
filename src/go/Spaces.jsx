import { useState, useEffect, useContext } from 'react'
import { useActor } from "@xstate/react";

import { BlackStone } from './BlackStone.jsx'
import { WhiteStone } from './WhiteStone.jsx'


import { AppContext } from '../App.jsx'

function Space( props )
{
  return <mesh { ...props }
      rotation-x={ - Math.PI * 0.5 } 
      scale={ 0.015 }
  >
    <planeGeometry />
    <meshBasicMaterial color={ 'red' } transparent={ true } opacity={ 0.2 } />
  </mesh>
}

export function Spaces()
{  
  console.log('instantiating spaces')


  const appServices = useContext(AppContext)
  console.log(appServices)

  const [ state, send, localservice ] = useActor(appServices.appMachineService)
  console.log(state)

  appServices.appMachineService.subscribe(state => console.log(state))


  const clickFunc = (e) => send({ 
              type: 'SUBMIT', 
              spaceIndex: e.eventObject.userData.index, 
              spaceType:  e.eventObject.userData.type
            } )

  return <group>
    {state.context.boardstate.map((type, index) => {
        const xSpaceSize = 0.17 / 9
        const xpos = xSpaceSize * ( index % 19 - 9 )
        const ypos = xSpaceSize * ( Math.floor( index / 19 ) - 9 ) 
        if( type === 'e' ) { return <Space key={index} 
            userData={{index: index, type: 'e'}} 
            position={[ xpos, 0.19, ypos ]} 
            onClick={ clickFunc }
        /> }
        if( type === 'b' ) { return <BlackStone key={index} 
          userData={{index: index, type: 'b'}} 
          position={[ xpos, 0.19, ypos ]} 
          onClick={ clickFunc }
        /> }
        if( type === 'w' ) { return <WhiteStone key={index} 
          userData={{index: index, type: 'w'}} 
          position={[ xpos, 0.19, ypos ]} 
          onClick={ clickFunc }
        /> }
      }
    )}
  </group>
}