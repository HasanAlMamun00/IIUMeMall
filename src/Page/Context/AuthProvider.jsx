import { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import app from '../Firebase/Firebase.config';
import toast from 'react-hot-toast';

export const AuthContext = createContext();
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    // const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    return user;
                } else {
                    // User is null, something went wrong
                    return "Something went wrong";
                }
            })
            .catch(error => {
                return "Already have an account";
            })
            .finally(() => {
                setLoading(false); // Assuming setLoading is a function to reset loading state
            });
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    return user;
                } else {
                    // User is null, something went wrong
                    return "Something went wrong";
                }
            })
            .catch(error => {
                return "Invalid credentials.";
            })
            .finally(() => {
                setLoading(false); // Assuming setLoading is a function to reset loading state
            });
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser?.email)
            setLoading(false);
        })
        return () => unSubscribe;
    }, [])

    useEffect(() => {
        fetch(`https://llumemall-backend.vercel.app/userReg/${user}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.statusCode === 200 && data.success === true) {
                    setRole(data?.data?.role);
                    setImage(data?.data?.image)
                }
            })
    }, [user])

    console.log("Auth Provider User: ", user);
    console.log("role: ", role);

    const info = {
        createUser,
        signIn,
        logOut,
        googleSignIn,
        loading,
        user,
        role,
        image
    }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;