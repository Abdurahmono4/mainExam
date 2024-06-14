import { useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";

function Home() {
  const { user } = useSelector((state) => state.currentUser);

  return (
    <div className="container-class px-8">
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;
