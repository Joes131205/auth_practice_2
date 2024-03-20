import { useEffect, useState } from "react";
import app from "../firebase";

import ProfilePicture from "../ProfilePicture";

import { useNavigate, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
    const storage = getStorage();
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

    async function fetchProfilePicture(uid) {
        try {
            const profilePictureRef = await ref(
                storage,
                `profile-pictures/${uid}`
            );
            console.log(profilePictureRef);
        } catch (error) {
            console.error("Error fetching profile picture:", error);
        }
    }

    function handleSignOut() {
        auth.signOut();
    }
    useEffect(() => {
        if (uid) {
            fetchUsername(uid);
            fetchProfilePicture(uid);
        }
    }, [uid]);
    return (
        <div>
            <p>Root</p>
            <p>Your username: {username}</p>
            <ProfilePicture
                uid={uid}
                fetchProfilePicture={fetchProfilePicture}
            />
            <button onClick={handleSignOut}>Sign Out</button>
            <Link to="/setting">Setting</Link>
        </div>
    );
}

export default Root;
