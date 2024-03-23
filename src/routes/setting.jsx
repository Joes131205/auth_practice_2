import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import app from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore,
    setDoc,
    doc,
    getDoc,
    collection,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Setting() {
    const [data, setData] = useState({
        username: "",
        profilePicture: "",
    });

    const db = getFirestore(app);
    const storage = getStorage();
    const auth = getAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "profilePicture") {
            let image = e.target.files[0];
            const newFilename = `${auth.currentUser.uid}.${image.name
                .split(".")
                .pop()}`;
            const newBlob = new Blob([image], { type: image.type });

            newBlob.name = newFilename;
            setData((prev) => ({ ...prev, [name]: newBlob }));
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    }
    async function changeProfilePicture(image) {
        const storageRef = ref(storage, `profile-pictures/${image.name}`);
        await uploadBytes(storageRef, image);
    }
    async function changeUsername(username) {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
            username,
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await changeProfilePicture(data.profilePicture);
        await changeUsername(data.username);
        navigate(0);
    }
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const db = getFirestore(app);
                const usersCollection = collection(db, "users");
                try {
                    const userDocRef = doc(usersCollection, uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists) {
                        const userData = userDocSnap.data();
                        const userName = userData.username;
                        setData((prevState) => ({
                            ...prevState,
                            username: userName,
                        }));
                        console.log(data);
                    } else {
                        console.log(
                            "No user document found with the provided ID"
                        );
                    }
                } catch (error) {
                    console.error("Error fetching username:", error);
                }
            } else {
                navigate("/signin");
            }
        });
    }, []);
    return (
        <div>
            <h1>Setting</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label for="username">
                    Change Username
                    <input type="text" name="username" id="username" />
                </label>

                <label for="profilePicture">
                    Change Profile Picture
                    <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default Setting;
