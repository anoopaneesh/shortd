import React, { JSX, PropsWithChildren, useEffect } from 'react'
import { useAppData } from '../context/AppContext'
import { useNavigate } from 'react-router'
import { ROUTES } from '../common/constant'
import { SkeletonText } from './ui/skeleton'

const ProtectedRoute  = (Component: () => JSX.Element) => {
  return  (props:any) => {
    const {loading,user} = useAppData()
    const navigate = useNavigate()
    useEffect(() => {
      if(!loading && !user){
        navigate(ROUTES.SignIn) 
      }
    },[loading,user])
    return !loading ? <Component {...props} /> :  <SkeletonText noOfLines={3} gap="4" />
  }
}

export default ProtectedRoute
