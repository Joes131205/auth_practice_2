import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import app from "../firebase";

import { getFirestore, setDoc, doc } from "firebase/firestore";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from "firebase/auth";

function SignUp() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore(app);

    const storeUsername = async (uid, username) => {
        try {
            await setDoc(doc(db, "users", uid), {
                username,
            });
        } catch (error) {
            console.error("Error storing username:", error);
        }
    };
    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const { username, email, password, confirmPassword } = data;
        if (password === confirmPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                storeUsername(user.uid, username);
            } catch (error) {
                console.error("Error creating user:", error);
            }
        } else {
            alert("Passwords do not match");
            return;
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/");
            }
        });
    }, []);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1>Sign Up</h1>
            <form
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
            >
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={data.username}
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                />
                <button type="submit">Sign Up</button>
            </form>
            <Link to="/signin">Sign In</Link>
        </div>
    );
}

export default SignUp;
