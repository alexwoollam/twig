'use client'

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {validateToken} from "@/lib/actions/loginActions";

export default function AuthGate({children}: {
    children: React.ReactNode
}) {

    const dispatch = useDispatch();

    let userToken = useSelector((state) => state.token);
    const router = useRouter();

    useEffect(() => {
        const validateUserToken = async () => {
            try {
                const valid = await dispatch(validateToken(userToken));
                if(! valid){
                    router.push('/login');
                    return;
                }
                console.log(valid);
            } catch (error) {
                console.error('Error validating token:', error);
            }
        };

        validateUserToken();
    }, [dispatch, userToken]);

    if (!userToken) {
        router.push('/login');
        return;
    }

    return (
        <>
            {children}
        </>
    )
}