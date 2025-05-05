import { Field } from '@/components/ui/field'
import { PasswordInput } from '@/components/ui/password-input'
import { Button, Card, Image, Input, Stack, Text } from '@chakra-ui/react'
import login from '../assets/login.svg'
import { useState } from 'react' 
import { toaster } from '@/components/ui/toaster'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/common/constant'
import { useAppData } from '@/context/AppContext'
enum FormState {
    SignIn = 'signin',
    SignUp = 'signup'
}
const StaticDetails = {
    [FormState.SignIn]: {
        title: "Sign In",
        description: "Enter details to sign in",
        btnText: "Sign In",
        footerText: "Not have account yet ? ",
        oppActionText: 'Sign Up',
        oppAction: FormState.SignUp
    },
    [FormState.SignUp]: {
        title: "Sign Up",
        description: "Enter details to create account",
        btnText: "Sign Up",
        footerText: "Already have an account ? ",
        oppActionText: 'Sign In',
        oppAction: FormState.SignIn
    },
}
type ErrorType = {
    email:string
    password:string
}
const SignIn = () => {
    const [state, setState] = useState<FormState>(FormState.SignIn)
    const navigate = useNavigate()
    const handleStateChange = (newstate: FormState) => {
        setState(newstate)
    }
    const {signIn,signUp} = useAppData()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errors,setErrors] = useState({} as ErrorType)
    const [loading,setLoading] = useState(false)
    const validate = () => {
        const newerrors = {email:"",password:""}
        setErrors(newerrors)
        if(email && !(/^[^@]+@[^@]+\.[^@]+$/.test(email))) newerrors.email = "Email is not valid"
        if(!email || email.length == 0) newerrors.email = "Email is required"
        if(!password || password.length == 0) newerrors.password = "Password is required"
        if(password && (password.length < 3 || password.length > 10)) newerrors.password="Password length must be between 3 to 10"
        setErrors(newerrors)
    }
    const handleSubmit = async () => {
        try{
            setLoading(true)
            validate()
            if(!Object.values(errors).filter(i => Boolean(i)).length){
                if(state === FormState.SignIn)
                    await signIn(email,password)
                else if(state === FormState.SignUp){
                    await signUp(email,password)
                    toaster.create({
                        placement:"bottom-end",
                        title: "Check you email to verify account",
                        type:"success"
                    })
                }
                navigate(ROUTES.Dashboard)
            }
        }catch(error : any){
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
        <div className='flex justify-center items-center min-h-screen'>
            <div className='hidden lg:block'>
                <Image  src={login} alt="Login image" aspectRatio={16 / 9} className='w-lg' objectFit="contain" />
            </div>
            <Card.Root className='w-md lg:w-lg'>
                <Card.Header>
                    <Card.Title fontSize={30}>{StaticDetails[state].title}</Card.Title>
                    <Card.Description>{StaticDetails[state].description}</Card.Description>
                </Card.Header>
                <Card.Body>
                    <Stack gap={4}>
                        <Field label="Email" errorText={errors.email}>
                            <Input value={email} type='email' onChange={(event) => setEmail(event.target.value) } />
                        </Field>
                        <Field label="Password" errorText={errors.password}>
                            <PasswordInput value={password} type='password' onChange={(event) => setPassword(event.target.value) } />
                        </Field>
                    </Stack>
                </Card.Body>
                <Card.Footer>
                    <Stack gap={4}>
                        <Button type='submit' colorPalette="purple"
                            onClick={handleSubmit}
                            disabled={loading}
                        >{StaticDetails[state].btnText}</Button>
                        <Text>{StaticDetails[state].footerText}<span className='underline text-purple-500 cursor-pointer' onClick={() => handleStateChange(StaticDetails[state].oppAction)}> {StaticDetails[state].oppActionText} </span></Text>
                    </Stack>
                </Card.Footer>
            </Card.Root>
        </div>
    )
}

export default SignIn
