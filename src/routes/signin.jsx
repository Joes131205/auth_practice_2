import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const auth = getAuth();
    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        const { email, password } = data;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <div>
            <h1>Sign In</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Sign In</button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default SignIn;
