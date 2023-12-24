import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const SignIn = (auth) => {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.customData.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
                console.log(error);
            });
    }
    return (
        <button onClick={signInWithGoogle}>
            Signin
        </button>
    );
};

export default SignIn;
