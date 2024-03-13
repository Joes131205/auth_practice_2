import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import app from "../firebase";

import { getStorage, ref, uploadBytes } from "firebase/storage";

function SignUp() {
    const [data, setData] = useState({
        photo: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();
    const storage = getStorage();

    function handleChange(e) {
        console.log(e.target.name);
        const { name, value } = e.target;
        if (name === "photo") {
            const file = e.target.files[0];
            if (file) {
                setData({ ...data, [name]: file });
            }
        } else {
            setData({ ...data, [name]: value });
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const file = data.photo;

        const storageRef = ref(storage, `images/${data.photo.name}`);

        const metadata = {
            contentType: file.type,
        };

        await uploadBytes(storageRef, file, metadata).then((snapshot) => {
            console.log("Uploaded a file to:", snapshot.ref.fullPath);
        });
        console.log(data);
    }
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1>Sign Up</h1>
            <form
                onChange={handleChange}
                onSubmit={handleSubmit}
                className="flex flex-col gap-10"
            >
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="photo"
                />
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
