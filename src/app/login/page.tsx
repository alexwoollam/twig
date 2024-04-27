"use client";

import react, {useState} from 'react';
import styles from "../page.module.css";
import button from "../button.module.css";
import {Logo} from "@/Components/Logo";
import {login} from "@/lib/actions/loginActions";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";

export default function Login() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loginDetails, setLoginDetails] = useState(
        {email: '', password: ''}
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

    const handleEmail = (input) => {
        resetErrors();
        setLoginDetails(
            {
                ...loginDetails,
                email:  input.target.value
            }
        );
    }

    const handlePassword = (input) => {
        resetErrors();
        setLoginDetails(
            {
                ...loginDetails,
                password:  input.target.value
            }
        );
    }

    const handleLogin = () => {
        if(loginDetails.email === ''){
            setError(true);
            setErrorMessage('Email required.');
            return;
        }
        if(loginDetails.password === ''){
            setError(true);
            setErrorMessage('Password required.');
            return;
        }

        const loginAttempt = dispatch(login(loginDetails));


        loginAttempt.then((response) => {
            if(response){
                router.push('/dashboard')
            };
        });
    }

    return (
        <main className={currentClass()}>
            <div className={styles.formBlock}>
                <div className={styles.logoWrapper}>
                    <Logo color={'#76b852'}/>
                </div>
                <form className={styles.form}>
                    <p className={styles.inputMessage}>{errorMessage}</p>
                    <input className={styles.input}
                           onChange={handleEmail}
                           value={loginDetails.email}
                           type="email"
                           placeholder="email"
                    />
                    <input className={styles.input}
                           onChange={handlePassword}
                           value={loginDetails.password}
                           type="password"
                           placeholder="Password"
                    />
                    <button className={buttonClass()} onClick={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>login
                    </button>
                    <p className={styles.inputMessage}>Not registered? <a href="/register">Create an account</a></p>
                </form>
            </div>
        </main>
    );
}
