import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";

function useRegister() {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const signWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      setIsPending(true);
      const result = await signInWithPopup(auth, provider);
      GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      dispatch(login(user));
      toast.success("welcome");
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      const email = error.customData ? error.customData.email : null;
      GoogleAuthProvider.credentialFromError(error);
    }
  };
  return { signWithGoogle, isPending };
}
export { useRegister };
