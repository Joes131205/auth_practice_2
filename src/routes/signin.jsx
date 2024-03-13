import { useNavigate, Link } from "react-router-dom";

function SignIn() {
    return (
        <div>
            <h1>Sign In</h1>
            <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign In</button>
            </form>
            <Link to="/signup">Sign Up</Link>
        </div>
    );
}

export default SignIn;
