import { createContext, useEffect, useState,useContext,useRef } from 'react';
import { onAuthStateChanged ,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import { auth ,db} from '../firebaseconfig';
import {doc ,getDoc, setDoc} from 'firebase/firestore'
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
                setIsAuthenticated(true);
                updateUserData(user.uid);
            }else{
                setUser(null);
                setIsAuthenticated(false);
            }
        });
      }  , []);

    const updateUserData = async (uid) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            let data=docSnap.data();
            setUser({...user,username:data.username,profileUrl:data.profileUrl,uid:data.uid});
        }
    }
    const login = async (email, password) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response?.user);

            return {success: true, data: response?.user};

        }catch(e){
            if (msg.includes("(auth/invalid-email)")){
                msg="Invalid Email";
            }
            if (msg.includes("(auth/invalid-credential)")){
                msg="Wrong Email or Password";
            }
            return {success: false, data: msg};
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
            return {success: true};

        }catch(e){
            console.log(e);
            return {success: false};
        }
    }
    const register = async (email, password,username,profileUrl) => {
        try{

            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response?.user);


            await setDoc(doc(db,"users", response?.user?.uid), {
                username: username,
                profileUrl: profileUrl,
                uid: response?.user?.uid
            });
            return {success: true, data: response?.user};

        }catch(e){
            let msg=e.message;
            if (msg.includes("(auth/invalid-email)")){
                msg="Invalid Email";
            }
            if (msg.includes("(auth/email-already-in-use)")){
                msg="This Email already in use";
            }
            return {success: false, data: msg};
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}