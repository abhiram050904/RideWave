import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { RegisterRoute } from "../apiRoutes";
import Logo from '../images/logo.png';
import bg from '../images/background.webp'; // Import the background image

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate("/");
        }
    }, [navigate]);

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same.", toastOptions);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters.", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.", toastOptions);
            return false;
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address.", toastOptions);
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
            setLoading(true);
            const { email, username, password } = values;
            try {
                const { data } = await axios.post(RegisterRoute, {
                    username,
                    email,
                    password,
                });

                setLoading(false);
                if (data.status === false) {
                    toast.error(data.msg, toastOptions);
                } else if (data.status === true) {
                    localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                    localStorage.setItem('userId', data.user._id);
                    navigate("/");
                }
            } catch (error) {
                setLoading(false);
                toast.error("Registration failed. Please try again.", toastOptions);
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
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                required
                            />
                        </InputContainer>
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating User..." : "Create User"}
                        </button>
                        <span>
                            Already have an account? <Link to="/login">Login.</Link>
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
        background-color: #5c60e6; 
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: background-color 0.3s ease, transform 0.3s ease; 

        &:hover {
            background-color: green; 
            transform: scale(1.05); 
        }
        
        &:disabled {
            background-color: #ccc; 
            cursor: not-allowed; 
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
    align-items: center; 
    width: 100%; 

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
