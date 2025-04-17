import React ,{useState ,useEffect} from 'react'
import dbservice from '../appwrite/config'  
import { Container , Postcard } from '../components'

function Home() {
    const[posts,setPosts]=useState([])
    useEffect(()=>{
        dbservice.getPosts().then((post)=>{
            if(post)
                setPosts(post.documents)
        })
    },[])
    if(posts.length===0){ 
             return(
                <div>
                    <Container>
                        <div className='flex justify-center items-center h-screen'>
                            <h1 className='text-2xl font-bold'> Login to read posts </h1>
                        </div>
                    </Container>
                </div>
             ) 
       
    } 
  return (
    <div>
    <Container>
        <div>
            {posts.map((post)=>(
                <Postcard key={post.$id} {...post}/>
            ))}
        </div>
    </Container>
</div>
  )
}

export default Home