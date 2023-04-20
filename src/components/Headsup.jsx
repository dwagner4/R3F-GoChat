import React, { useContext, useEffect, useState } from 'react'
import { useActor } from "@xstate/react";

// import { db } from '../firebase-config'
// import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'

import { AppContext } from '../App.jsx'
import '../styles/Chat.css'
import { Auth } from './auth/Auth.jsx';

const GameForm = () => 
{
  const [ newName, setNewName ] = useState('frank')

  // const messagesRef = collection(db, "GoGames")

  const appServices = useContext(AppContext)
  const [ state, send, raise, localservice ] = useActor(appServices.appMachineService)


  // useEffect(() => {
  //   const queryMessages = query(
  //     messagesRef, 
  //     where("room", "==", room),
  //     orderBy("createdAt")
  //   )
    
  //   const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
  //     let messages = []
  //     snapshot.forEach((doc) => {
  //       messages.push({...doc.data(), id: doc.id })
  //     })
  //     setMessages(messages)
  //   })
  //   return () => unsubscribe()
  // }, [])



  // const handleSubmit = async (e) => 
  // {
  //   e.preventDefault()
  //   if ( newName === "") return
  //   const result = await addDoc(messagesRef, {
  //     name: newName,
  //     createdAt: serverTimestamp(),
  //     room: "fuck you",
  //   })
  //   setNewName("")
  //   console.log("fuck you", result)
  // }

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    console.log(e)
    send({type: 'HAS_GAME_ID', newname: newName})
  }

  return (
    <div>
      <h2>GameForm, {newName} </h2>
      {/* <form onSubmit={handleSubmit} className="new-message-form"> */}
        <input 
          className="new-message-input" 
          placeholder="Type your name here..."
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />  
          
        <div>
          <input type="radio" id="huey" name="drone" value="huey" checked />
          <label for="huey">Black</label>
        </div>
        <div>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label for="dewey">White</label>
        </div>
        {/* <button type="submit" className="send-button"> Start </button> */}
        <button onClick={handleSubmit} className="send-button"> Start </button>

        
      {/* </form> */}
    </div>
  )
}

const GameSubmitted = () => 
{
  return <div>GameSubmitted</div>
}

const GamePlay = () => 
{
  return <div>GamePlay</div>
}

export const Headsup = () =>
{
  const appServices = useContext(AppContext)
  const [ state, send, localservice ] = useActor(appServices.appMachineService)

  return (
    <div>
      {/* <h1>Yoho {state.value}</h1> */}
      <Auth />
      { state.matches('gameform') ? <GameForm /> : null }
      { state.matches('gamesubmitted') ? <GameSubmitted /> : null }
      { state.matches('gameplay') ? <GamePlay /> : null }
    </div>

  )
}