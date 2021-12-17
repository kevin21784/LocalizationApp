import React,{createContext, useContext, useEffect, useState} from 'react'
import { auth } from '../config/firebase'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }
    return (<AuthContext.Provider value={value}>
             {!loading && children} 
            </AuthContext.Provider>
    )
}
