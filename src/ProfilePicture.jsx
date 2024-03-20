import { useState, useEffect } from "react";

function ProfilePicture({ uid, fetchProfilePicture }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const url = await fetchProfilePicture(uid);
                setImageUrl(url);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImage();
    }, [uid]);
    return (
        <div className="profile-picture">
            {isLoading && <span>Loading...</span>}
            {error && <span>Error: {error.message}</span>}
            {imageUrl && <img src={imageUrl} alt="Profile Picture" />}
        </div>
    );
}

export default ProfilePicture;
