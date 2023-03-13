import { auth, provider, db } from './firebase-config.js'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'

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

 const messagesRef = collection(db, "GoGames")

export const gameWrite = async (e) => 
{
  console.log('gmaeWrite', e)
  //TODO add validation
  const result = await addDoc(messagesRef, {
        name: e.newname,
        createdAt: serverTimestamp(),
        room: "fuck you",
      })
}

export const chatWrite = (c) => 
{
  console.log('gmaeWrite', c)
}

