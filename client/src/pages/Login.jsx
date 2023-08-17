import React, { createContext } from 'react'
import { Button, Typography } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { graphQLRequest } from '../utils/request'

export default function Login() {
  const auth = getAuth()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const {user: {uid, displayName}} = await signInWithPopup(auth, provider)
    const {data} = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!){
        register(uid: $uid, name: $name) {
          uid,
          name
        }
      }`,
      variable: {
        uid,
        name: displayName
      }
  })
    console.log({data})
  }

  if (user?.uid) {
    // navigate('/')
    return <Navigate to="/" />
  }

  return (
    <>
      <Typography variant='h5' sx={{marginBottom: '10px'}}>Welcome to Note App</Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>Login With Google</Button>
    </>
  )
}
