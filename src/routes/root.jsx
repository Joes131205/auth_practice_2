import { useEffect, useState } from "react";
import app from "../firebase";

import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function Root() {
    const auth = getAuth();
    const navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
            } else {
                navigate("/signin");
            }
        });
    }, []);
    return (
        <div>
            <p>Root</p>
        </div>
    );
}

export default Root;
