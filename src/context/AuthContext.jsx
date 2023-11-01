import { useContext, createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {


    const [user, setUser] = useState({});

    const [token, setToken] = useState("");

    const navigate = useNavigate();


    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then(async (result) => {

            if (result.user) {
                const userData = await getDoc(doc(db,"users", result.user.uid))

                if (userData.data() == undefined) {

                    try {
                        setDoc(doc(db,"users",result.user.uid), { 
                            uid: result.user.uid,
                            name: result.user.displayName,
                            token: result.user.uid.slice(0, 4) +
                                      Math.trunc(Math.random() * 10).toString() +
                                      Date.now().toString().slice(-6, -1)
                        })
                        
                    } catch(err) {
                        console.log(err);
    
                    }    

                    navigate('/create');
                } 

                navigate('/');
                
            }
        })
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
                setUser(currUser)
        })

        return () => {
            unsubscribe();
        }
    },[user])
    

    useEffect(() => {
        (async () => {
            if (user != null) {
                const userData = await getDoc(doc(db,"users", user.uid))

                setToken(userData.data().token)
            }
        })
        ();
    },[user])


    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}