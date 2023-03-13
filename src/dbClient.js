import { useActor } from "@xstate/react";

import { auth, provider, db } from './firebase-config.js'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { appMachineService } from './appMachine.js'



 

  
// const [ state, send, raise, localservice ] = useActor(appMachineService)

 const messagesRef = collection(db, "GoGames")

 const queryMessages = query(
  messagesRef, 
  // where("room", "==", room),
  // orderBy("createdAt")
)

const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
  let messages = []
  snapshot.forEach((doc) => {
    messages.push({...doc.data(), id: doc.id })
  })
  console.log(messages)
  appMachineService.send({ type: 'DATA_UPDATE' })
})

export const gameWrite = async (e) => 
{
  console.log('gmaeWrite', e)
  //TODO add validation
  const result = await addDoc(messagesRef, {
        name: e.newname,
        createdAt: serverTimestamp(),
        room: "fuck you",
      })
  console.log("fuck you", result)
}

export const chatWrite = (c) => 
{
  console.log('gmaeWrite', c)
}

