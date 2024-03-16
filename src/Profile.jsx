import { useUsername } from "./UsernameContext";

function Profile() {
    const { username } = useUsername();

    return (
        <div>
            {username ? (
                <h1>{`Hello, ${username}!`}</h1>
            ) : (
                <p>Loading username...</p>
            )}
        </div>
    );
}
export default Profile;
