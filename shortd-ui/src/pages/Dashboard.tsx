import React, { useEffect, useState } from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAppData } from '../context/AppContext'
import ShortenUrl from '@/components/ShortenUrl'
import MyShortd from '@/components/MyShortd'
import { Shortd } from '@/types'
import { deleteShortd, getAllShortd, shortenUrl } from '@/services/shortdService'
import { toaster } from '@/components/ui/toaster'
import { Alert, Box } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const Dashboard = () => {
  const [loading, setLoading] = useState(false)
  const [shortd, setShortd] = useState<Shortd[]>([])
  const { user, updateCredits } = useAppData()
  const handleSubmit = async (url: string) => {
    const data = await shortenUrl(url)
    setShortd(oldData => [...oldData.filter(i => i._id !== data._id), data])
    updateCredits(-1)
  }
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getAllShortd()
      setShortd(data)
    } catch (error: any) {
      toaster.create({
        placement: "bottom-end",
        title: error.message,
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }
  const handleDelete = async (sid: string) => {
    try {
      setLoading(true)
      await deleteShortd(sid)
      setShortd(oldData => [...oldData.filter(i => i.sid !== sid)])
      updateCredits(1)
    } catch (error: any) {
      toaster.create({
        placement: "bottom-end",
        title: error.message,
        type: "error"
      })

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Navbar />
      {!user?.isEmailVerified && <Alert.Root status="warning">
        <Alert.Indicator />
        <Alert.Title>
          Email is not verified. Please verify your email to shorten urls
        </Alert.Title>
      </Alert.Root>}
      <Box className='flex lg:flex-row flex-col items-center justify-center h-[calc(100vh-150px)] gap-6' paddingX={{ lgDown: 16, lg: 0 }}>

        <ShortenUrl handleSubmit={handleSubmit} />
        <MyShortd shortd={shortd} loading={loading} handleDelete={handleDelete} />
      </Box>
    </div>
  )
}

export default ProtectedRoute(Dashboard)
