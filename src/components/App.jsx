import { useState, useEffect } from 'react'

function App() {

    // Stores the current dog image displayed on the page
    const [dogImage, setDogImage] = useState("");

    // Tracks whether a dog image is currently being fetched
    const [loading, setLoading] = useState(true);

    function fetchDogImage() {

        setLoading(true);

        fetch("https://dog.ceo/api/breeds/image/random")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Fetch failed")
                }
                return response.json();
            })
            .then((data) => {
                setDogImage(data.message);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                setLoading(false);
            })
    }

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
                    <img
                        src={dogImage}
                        alt="A Random Dog"
                        style={{
                            width: '500px',
                            height: "400px",
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                    <button
                        onClick={fetchDogImage}
                        style={{
                            fontSize: "20px",
                            color: "white",
                            background:"rgb(90, 190, 255)",
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
