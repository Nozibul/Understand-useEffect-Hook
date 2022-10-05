
// Understand The Usage of useEffect Hook 

import React, { useEffect, useState } from 'react'

const App = () => {
  const [user, setUser] = useState([])
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(false)
  

  const [count, setCount] = useState(0)
  const [lock, setLock] = useState(false);
  const [time, setTime] = useState(5)
  useEffect(()=>{
    if(count === 5){
      setLock(true)
    }
  },[count])

  let timeInterval = null;
  useEffect(()=>{
    if(lock){
      timeInterval = setInterval(()=>{
         setTime((prev)=> prev - 1) 
      }, 1000)
    }
   
  },[lock])


  useEffect(()=>{
    if(time === 0){
      setCount(0)
      setLock(false)
      setTime(5)
      clearInterval(time)
    }

  },[time])


  // another way
  /* let timeInterval = null;
   useEffect(()=>{
    if(lock){
    timeInterval = setInterval(()=>{
       if(time !== 0){
        setTime(time - 1)
       }else{
        setCount(0)
        setLock(false)
        clearInterval(time) // time initial value 5 ta set hoa jabe abr
       }
      }, 1000)
    }
   }, [lock, time]) */


                        /* 2nd part of useEffect */

  const nextHandler =()=>{
    if(id < 10){
      setId(id + 1)
    }
  }

  const prevHandler =()=>{
    if(id >= 1){
      setId(id - 1)
    }
  }


   useEffect(()=>{
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res)=>res.json())
    .then((data)=>setUser(data))
    .finally(()=> setLoading(false))
   },[id])

  return (
    <> <h1>Understand The Usage of useEffect Hook </h1>
       
       <div>
         <h1>{count}</h1>
         <button
          id='btn'
          disabled={lock}
          onClick={()=> setCount(count + 1)} 
         >
          Add {lock && `locked - ${time}s`}
         </button>
       </div>


       {/*  2nd part of useEffect  */}
        <div>
           {loading && <p>Loading...</p>}
          <h3>User {id}</h3>
          { !loading && user && (
            <div>
              name: {user.name} <br />
              email: {user.email} <br />
              phone: {user.phone}
            </div>
          )}
          <div>
            <button disabled={id===1} onClick={prevHandler}>previous</button>
            <button disabled={id===10} onClick={nextHandler}>next</button>
          </div>
        </div>
    </>
  )
}

export default App