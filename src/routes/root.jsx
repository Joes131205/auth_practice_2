import { useEffect, useState } from "react";
import app from "../firebase";

import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";

function Root() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [username, setUsername] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                const uid = user.uid;
                setUid(uid);
            } else {
                navigate("/signup");
            }
        });
    }, []);
    const db = getFirestore(app);
    const usersCollection = collection(db, "users");
    async function fetchUsername(currUid) {
        if (!currUid) {
            console.warn("uid is empty. Username cannot be fetched.");
            return;
        }

        try {
            const userDocRef = doc(usersCollection, currUid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists) {
                const userData = userDocSnap.data();
                const userName = userData.username;
                setUsername(userName);
                console.log("Username:", username);
            } else {
                console.log("No user document found with the provided ID");
            }
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    }
    function handleSignOut() {
        auth.signOut();
    }
    useEffect(() => {
        if (uid) {
            fetchUsername(uid);
        }
    }, [uid]);
    return (
        <div>
            <p>Root</p>
            <p>Your username: {username}</p>
            <button onClick={handleSignOut}>Sign Out</button>
            <Link to="/setting">Setting</Link>
        </div>
    );
}

export default Root;
