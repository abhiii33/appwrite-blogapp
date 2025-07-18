import React from 'react'
import dbservice from '../appwrite/config'
import { useEffect, useState } from 'react'
import{ Container ,Postcard} from '../components'
import { set } from 'react-hook-form'
import { useSelector } from 'react-redux'
const AllPosts = () => {
   const authstatus = useSelector((state)=> state.auth.status)
    const[posts,setPosts]=useState([])
    const allpost = async()=>{
     try {
       const  postss=  await dbservice.getPosts([])
        if(postss){
         setPosts(postss.documents)
        }
     } catch (error) {
      
     }
    }
    useEffect(()=>{
      if(authstatus) 
        allpost()
      else
        setPosts([])
     } ,[authstatus])

  return (
    <div><Container>
         {posts.map((post)=>(
             <Postcard key={post.$id} {...post}/>
         ))}
        </Container></div>
  )
}

export default AllPosts