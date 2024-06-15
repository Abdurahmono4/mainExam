import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { addProduct } from "../features/productSlice";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const product = products.find((item) => item.id === id);

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

  const handleAddToCart = () => {
    dispatch(addProduct({ ...recipe, id }));
    navigate("/cart"); // Navigate to cart page after adding item
  };

  return (
    <div className="container-class mx-auto mt-20 ml-auto mr-auto mb-10">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
            className="rounded-box"
            alt="carousel-item-1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
            className="rounded-box"
            alt="carousel-item-2"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
            className="rounded-box"
            alt="carousel-item-3"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
            className="rounded-box"
            alt="carousel-item-4"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
            className="rounded-box"
            alt="carousel-item-5"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
            className="rounded-box"
            alt="carousel-item-6"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
            className="rounded-box"
            alt="carousel-item-7"
          />
        </div>
      </div>
      <p className="text-lg mt-6 ml-auto mr-auto">{recipe.method}</p>
      <p className="text-lg mt-4">
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </p>
      <p className="text-lg mt-4 ml-0">
        <strong>Ingredients:</strong>
      </p>
      <ul className="list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <div className="mt-8 flex gap-9">
        <div className="rounded-lg bg-slate-200 w-28 items-center justify-center flex gap-4">
          <button
            className="text-orange-500 text-3xl cursor-pointer"
            onClick={() => dispatch(decreaseAmount(id))}
            disabled={!product || product.amount === 0}
          >
            -
          </button>
          <button>{product ? product.amount : 0}</button>
          <button
            className="text-orange-500 text-2xl"
            onClick={() => dispatch(increaseAmount(id))}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-secondary bg-orange-500 w-48 add"
          onClick={handleAddToCart}
        >
          <BsCart3 className="" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
