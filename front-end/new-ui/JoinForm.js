import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm(){
    const hmsActions = useHMSActions();
    const [inputValues, setInputValues] = useState({
        name: "",
        roomCode: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const { name = '', roomCode } = inputValues;

        if ( !name || !roomCode){
            setErrorMessage("Both name and room code are required");
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        // use room code to fetch auth token
        //const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
        try {
            const response = await fetch(`http://localhost:3001/get-token`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roomCode })
            });
            if(!response.ok){
                throw new Error("Failed to fetch auth token");
            }
            const data = await response.json();
            const authToken = data.token;
            console.log("Token being passed to join:", authToken);
            await hmsActions.join({ 
                userName: name,
                authToken 
            });
            //await hmsActions.join({ userName, authToken });
        } catch (error) {
            console.error("Error joining the room:", error);
            setErrorMessage("Error joining the room. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Join Room</h2>
            <div className="input-container">
                <input
                    required
                    value={inputValues.name}
                    onChange={handleInputChange}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    />
            </div>
            <div className="input-container">
                <input
                    id="room-code"
                    type="text"
                    name="roomCode"
                    placeholder="Room code"
                    onChange={handleInputChange}
                    />
            </div>
            <button className="btn-primary" disabled={isLoading}>
                {isLoading ? "Joining..." : "Join"}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    );
}

export default JoinForm;