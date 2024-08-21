import { useState } from "react"
import { useNavigate } from "react-router-dom";


function Login() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            console.log("here?");
            const loginResponse = await fetch(`${API_URL}/login`, {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            const loginData = await loginResponse.json();
            localStorage.setItem("token", loginData.token);
            navigate("/");
        } catch (err) {
            alert("Could not log in")
            console.error(err)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </>
    )
}

export default Login