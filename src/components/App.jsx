import { useState, useEffect } from 'react'

function App() {

    // Stores the URL of the currently displayed dog image
    const [dogImage, setDogImage] = useState("");

    // Tracks whether the application is waiting for an API response
    const [loading, setLoading] = useState(true);

    // Fetches a random dog image from the Dog CEO API
    function fetchDogImage() {

        // Show loading message while request is in progressF
        setLoading(true);

        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => {

                // Throw an error if the request was unsuccessful
                if (!response.ok) {
                    throw new Error("Fetch failed")
                }

                return response.json();
            })
            .then((data) => {

                // Store the image URL returned by the API
                setDogImage(data.message);

                // Hide loading message after image is received
                setLoading(false);
            })
            .catch((error) => {

                // Log any errors encountered during the request
                console.error('Fetch error:', error);

                // Hide loading message after image is received
                setLoading(false);
            })
    }

    // Fetch a dog image once when the component first mounts
    useEffect(() => {
        fetchDogImage()
    }, []);

    return (
        <div className="app"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            <h1>Dog Image</h1>
            {loading ? (
                <p>
                    Loading...
                </p>
            ) : (
                <div style={{ width: "500px", height: "400px" }}>

                    {/* Display the current dog image */}
                    <img
                        src={dogImage}
                        alt="A Random Dog"
                        style={{
                            width: '500px',
                            height: "400px",
                            borderRadius: '8px'
                        }}
                    />

                    {/* Fetch a new dog image when clicked */}
                    <button
                        onClick={fetchDogImage}
                        style={{
                            fontSize: "20px",
                            color: "white",
                            background: "rgb(90, 190, 255)",
                            borderRadius: '8px',
                            borderColor: "rgb(172, 223, 254)",
                        }}
                    >
                        New Dog Image
                    </button>
                </div>
            )}

        </div>
    )
}

export default App
