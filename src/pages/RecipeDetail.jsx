import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { addProduct } from "../features/productSlice";

import {
  increaseAmount,
  decreaseAmount,
  getOneProduct,
} from "../features/productSlice";
import { login } from "../features/userSlice";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, product } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      if (docSnap.exists()) {
        setRecipe(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  const handleAddToCart = () => {
    dispatch(addProduct({ ...recipe, id }));
  };

  console.log(decreaseAmount, increaseAmount);

  return (
    <div className="container-class mx-auto mt-20 ml-auto mr-auto ">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        <div className="carousel-item">
          <img
            src="https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/97/42/9c.jpg"
            className="rounded-box"
            alt="carousel-item-1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://zira.uz/wp-content/uploads/2020/01/kovurma-shurpa.jpg"
            className="rounded-box"
            alt="carousel-item-2"
            width={604}
            height={246}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4kV_1xBvf3PhGXxL9pDBYrzj-efhbzLFK8w&s"
            className="rounded-box"
            alt="carousel-item-3"
            width={604}
            height={246}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://cp.platina.uz/media/uploads/2023/12/20/photo_2023-12-20_14-07-05-2.jpg"
            className="rounded-box"
            alt="carousel-item-4"
            width={704}
            height={246}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://t3.ftcdn.net/jpg/03/56/15/56/360_F_356155654_KnID81u6eAFFmQU8cB7y4ThqUu8nJEUT.jpg"
            className="rounded-box"
            alt="carousel-item-5"
            width={704}
            height={246}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://beksomsa.netlify.app/images/shorva.jpg"
            className="rounded-box"
            alt="carousel-item-6"
            width={704}
            height={246}
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
        <div className="rounded-lg bg-slate-200 w-28 items-center justify-center flex gap-4 mb-30">
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
          disabled={!product || product.amount === 0}
        >
          <BsCart3 className="" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;
