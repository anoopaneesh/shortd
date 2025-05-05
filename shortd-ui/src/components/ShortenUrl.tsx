import { Button, Card, Input, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Field } from './ui/field'
import { toaster } from './ui/toaster'
import Loading from './Loading'

type ShortenUrlProps = {
    handleSubmit: (url:string) => Promise<void>
}

const ShortenUrl = ({handleSubmit}:ShortenUrlProps) => {
    const [loading,setLoading] = useState(false)
    const [url,setUrl] = useState("") 
    const handleClick = async (url:string) => {
        try{
            setLoading(true)
            await handleSubmit(url);
            setUrl("")
        }catch(error:any){
             toaster.create({
                placement:"bottom-end",
                title: error.message,
                type:"error"
            })
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-full lg:w-lg'>
    <Card.Root> 
    <Card.Header>
        <Card.Title>Shorten your URLs</Card.Title>
    </Card.Header>
  <Card.Body>
    <Stack gap={4}>
        <Field label="Url">
            <Input type="text" value={url} onChange={(event) => setUrl(event.target.value)}/>
        </Field>
        <Button colorPalette="purple" disabled={loading || !url.length} onClick={() => handleClick(url)}>Shorten</Button>
    </Stack>
    </Card.Body>
  <Card.Footer />
</Card.Root>
    </div>
  )
}

export default ShortenUrl
