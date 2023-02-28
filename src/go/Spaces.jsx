import { useState, useEffect, useContext } from 'react'
import { useActor } from "@xstate/react";

import { BlackStone } from './BlackStone.jsx'
import { WhiteStone } from './WhiteStone.jsx'

import { goMachineService } from './goMachine.js'
import { GoContext } from './GoExperience.jsx'

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


  const goServices = useContext(GoContext)
  console.log(goServices)

  const [ state, send, localservice ] = useActor(goServices.goMachineService)
  console.log(state)

  goServices.goMachineService.subscribe(state => console.log(state))


  const clickFunc = (e) => send({ 
              type: 'SUBMIT', 
              spaceIndex: e.eventObject.userData.index, 
              spaceType:  e.eventObject.userData.type
            } )

  return <group>
    {state.context.board.map((type, index) => {
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