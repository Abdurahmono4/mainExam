import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container-class mx-auto mt-20 ml-auto mr-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
            className="rounded-box"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
            className="rounded-box"
          />
        </div>
      </div>
      <p className="text-lg">{recipe.method}</p>
      <p className="text-lg mt-4">
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </p>
      <p className="text-lg mt-4">
        <strong>Ingredients:</strong>
      </p>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeDetail;
