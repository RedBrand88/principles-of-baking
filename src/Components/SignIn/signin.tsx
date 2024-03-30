import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../Button/button";

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
        <Button onClick={signInWithGoogle}>
            Signin
        </Button>
    );
};

export default SignIn;
