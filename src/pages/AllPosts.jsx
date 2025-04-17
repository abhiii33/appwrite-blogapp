import React from 'react'
import dbservice from '../appwrite/config'
import { useEffect, useState } from 'react'
import{ Container ,Postcard} from '../components'
const AllPosts = () => {
    const[posts,setPosts]=useState([])
    const allpost = async()=>{
        await dbservice.getPosts([]).then(
            (posts)=>{
           if(posts)setPosts(posts.documents)
            }
            )
    }
  return (
    <div><Container>
         {posts.map((post)=>(
             <Postcard key={post.$id} {...post}/>
         ))}
        </Container></div>
  )
}

export default AllPosts