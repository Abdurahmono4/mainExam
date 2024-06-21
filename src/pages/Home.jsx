import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import PieChart from "./Chart"; // Chart componentini import qilamiz
import { getOneProduct } from "../features/productSlice";
import { useDispatch } from "react-redux";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipesCollection = collection(db, "recipes");
      const recipesSnapshot = await getDocs(recipesCollection);
      const recipesList = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesList);
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const counts = recipes.reduce((acc, recipe) => {
      // Kategoriyalarni hisoblash
      const category = recipe.category;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    }, {});
    setCategoryCounts(counts);
  }, [recipes]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "recipes", id));
      setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      toast.error("Error deleting recipe: " + error.message);
    }
  };

  const getAProduct = (id) => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      return docSnap;
    };

    fetchRecipe().then((res) => {
      if (res.data().title) {
        dispatch(getOneProduct({ ...res.data(), id, amount: 0 }));
        navigate("/recipe/" + id);
      }
    });
  };

  return (
    <div className="container-class mt-12 sm:mt-5">
      <h1 className="text-3xl font-bold text-center items-center ml-auto mr-auto mb-12">
        Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 ml-auto mr-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card bg-base-100 shadow-md rounded-lg overflow-hidden ml-auto mr-auto transform transition-transform duration-300  active:scale-95 hover:shadow-lg"
          >
            <figure>
              <img
                src={
                  recipe.image
                    ? recipe.image
                    : "https://via.placeholder.com/150"
                }
                alt={recipe.title}
                className="w-full h-32 sm:h-48 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold mb-2">
                {recipe.title}
              </h2>
              <p className="text-sm text-gray-600">
                {recipe.method.substring(0, 50)}...
              </p>
              <div className="card-actions justify-between items-center mt-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => getAProduct(recipe.id)}
                >
                  Read More
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this recipe? This action cannot be undone."
                      )
                    ) {
                      handleDelete(recipe.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
