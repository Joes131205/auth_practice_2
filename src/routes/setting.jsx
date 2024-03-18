import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import app from "../firebase";
import { onAuth, getAuth } from "firebase/auth";
import { getFirestore, getDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
            let reader = new FileReader();
            let image = e.target.files[0];
            reader.onloadend = () => {
                setData({
                    ...data,
                    [name]: reader.result,
                });
            };
            if (image) {
                reader.readAsDataURL(image);
            }
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        const storageRef = ref(storage);
        // TODO
    }
    useEffect(() => {
        onAuthState(auth, (user) => {
            if (user) {
                console.log(user);
            } else {
                navigate("/signin");
            }
        });
    }, []);
    return (
        <div>
            <h1>Setting</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <label>Change Username</label>
                <input type="text" name="username" />

                <label>Change Profile Picture</label>
                <input type="file" name="profilePicture" />
            </form>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default Setting;
