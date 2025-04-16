import React from 'react'
import {Container, PostForm} from '../components'
import dbservice from '../appwrite/config'
import { useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
function Editpost() {
    const [post, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()  
    useEffect(()=>{
        if (slug) {
           dbservice.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default Editpost