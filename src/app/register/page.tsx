"use client";

import react, {useState} from 'react';
import styles from "../page.module.css";
import button from "../button.module.css";
import {Logo} from "@/Components/Logo";

export default function Login() {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [registerDetails, setRegisterDetails] = useState(
        {firstName: '', lastName: '', email: '', password: ''}
    );

    const resetErrors = () => {
        setError(false);
        setErrorMessage('');
    }

    const currentClass = () => {
        if(error){
            return styles.mainError
        }
        return styles.mainFine
    }

    const buttonClass = () => {
        if(error){
            return button.error
        }
        return button.fine
    }

    const handleFirstName = (input) => {
        resetErrors();
        setRegisterDetails(
            {
                ...registerDetails,
                firstName:  input.target.value
            }
        );
    }

    const handleLastName = (input) => {
        resetErrors();
        setRegisterDetails(
            {
                ...registerDetails,
                lastName:  input.target.value
            }
        );
    }

    const handleEmail = (input) => {
        resetErrors();
        setRegisterDetails(
            {
                ...registerDetails,
                email:  input.target.value
            }
        );
    }

    const handlePassword = (input) => {
        resetErrors();
        setRegisterDetails(
            {
                ...registerDetails,
                password:  input.target.value
            }
        );
    }

    const handleLogin = () => {
        if(registerDetails.email === ''){
            setError(true);
            setErrorMessage('Email required.');
            return;
        }
        if(registerDetails.password === ''){
            setError(true);
            setErrorMessage('Password required.');
            return;
        }
    }

    return (
        <main className={currentClass()}>
            <div className={styles.formBlock}>
                <div className={styles.formInfo}>
                    <div></div>
                </div>
                <div className={styles.logoWrapper}>
                    <Logo color={'#76b852'}/>
                </div>
                <form className={styles.form}>
                    <p className={styles.inputMessage}>{errorMessage}</p>
                    <input className={styles.input}
                           onChange={handleFirstName}
                           value={registerDetails.firstName}
                           type="text"
                           placeholder="First Name"
                    />
                    <input className={styles.input}
                           onChange={handleLastName}
                           value={registerDetails.lastName}
                           type="text"
                           placeholder="First Name"
                    />
                    <input className={styles.input}
                           onChange={handleEmail}
                           value={registerDetails.email}
                           type="email"
                           placeholder="email"
                    />
                    <input className={styles.input}
                           onChange={handlePassword}
                           value={registerDetails.password}
                           type="password"
                           placeholder="Password"
                    />
                    <button className={buttonClass()} onClick={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>register
                    </button>
                    <p className={styles.inputMessage}>Already registered? <a href="/login">Login to your account</a></p>
                </form>
            </div>
        </main>
    );
}
