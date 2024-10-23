import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { LoginRoute } from "../apiRoutes";
import Logo from '../images/logo.png';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Loading state
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleValidation = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Password is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            setLoading(true); // Start loading
            const { username, password } = values;
            try {
                const { data } = await axios.post(LoginRoute, {
                    username,
                    password,
                });

                setLoading(false); // End loading
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    localStorage.setItem('userId', data.user._id); // Store user ID in local storage
                    navigate("/");
                }
            } catch (error) {
                setLoading(false); // End loading
                toast.error("Login failed. Please try again.", toastOptions);
                console.error(error); 
            }
        }
    };

    return (
        <>
            <FormContainer>
                <FormWrapper>
                    <form onSubmit={handleSubmit}>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h1>RapidWave</h1>
                        </div>
                        <InputContainer>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                minLength="3"
                                required
                                aria-label="Username"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                                aria-label="Password"
                            />
                        </InputContainer>
                        <button type="submit" disabled={loading}>
                            {loading ? "Logging In..." : "Log In"}
                        </button>
                        <span>
                            Don't have an account? <Link to="/register">Create One.</Link>
                        </span>
                    </form>
                </FormWrapper>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center; 
    align-items: center; 
    background: linear-gradient(135deg, #ff007f, #7a00ff); /* Reddish-violet gradient */
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    max-width: 400px; /* Set a max width for the form */
    width: 100%; /* Full width to be responsive */

    form {
        background-color: #ffffff; /* Set the background to a near-transparent white */
        border: 3px solid #ffffff;
        border-radius: 1.5rem; 
        padding: 2.5rem 5rem;
        box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1); 
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .brand {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 150px; /* Increased size of the logo */
        }

        h1 {
            background: linear-gradient(90deg, #000000, #ff0000); /* Greenish-red gradient */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.5rem; /* Increased font size */
            text-transform: uppercase;
        }
    }

    button {
        background-color:#5c60e6; /* Button color */
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: background-color 0.3s ease, transform 0.3s ease; /* Added transition */

        &:hover {
            background-color: green; /* Change color on hover */
            transform: scale(1.05); /* Increase size on hover */
        }
        
        &:disabled {
            background-color: #ccc; /* Disable button style */
            cursor: not-allowed; /* Change cursor */
        }
    }

    span {
        color: black; 
        text-transform: uppercase;

        a {
            color: violet; /* Changed color to violet */
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease, transform 0.3s ease; /* Added transition for smooth effect */

            &:hover {
                transform: scale(1.2); /* Increase size on hover */
                color: hotpink; /* Optional: Change color on hover to give more emphasis */
            }
        }
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* Center input fields */
    width: 100%; /* Ensure it takes full width of the form */

    input {
        background-color: transparent;
        padding: 1rem;
        margin: 1rem;
        border-radius: 10px;
        border: 2px solid pink; /* Changed border color to pink */
        color: black;
        width: 100%;
        font-size: 1rem;
        transition: border 0.3s ease, transform 0.3s ease; 

        &:focus {
            border: 2px solid hotpink; /* Changed focus border color to hotpink */
            outline: none;
            transform: scale(1.02); 
        }

        &:hover {
            border: 2px solid black; 
            transform: scale(1.01); 
        }
    }
`;
