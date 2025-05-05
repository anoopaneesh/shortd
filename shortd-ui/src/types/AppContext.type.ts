import { User } from "./User.type"

export type IAppContext = {
    loading: boolean
    user: User | null
    signIn:  (email:string,password:string) => Promise<void>
    signUp:  (email:string,password:string) => Promise<void>
    updateCredits: (n:number) => void;
    signOut: () => void
} 