import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import UpdateModal from "../Layout/UpdateModal";

function RecipesList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const refreshRecipes = () => {
        setLoading(true);
        fetch('/recipes/recipes')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(data => setRecipes(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    const closeUpdateModal = () => {
        setShowUpdateModal(false)
        setSelectedRecipe(null);
    };

    const showModal = (recipe) => {
        setSelectedRecipe(recipe);
        setShowUpdateModal(true);
    };

    const onDeleteRecipe = (recipeId) => {
        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY');

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,
            },
        };

        fetch(`/recipes/recipes/${recipeId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
        })
        .then(() => {
            setRecipes([])
            refreshRecipes();
        })
        .catch(err => console.error('Error:', err));
    };

    useEffect(() => {
        refreshRecipes();
    }, []);

    if (error) return <div className="recipes"><h1>Error: {error}</h1></div>;

    return (
        <div className="recipes">
            <UpdateModal
                showUpdateModal={showUpdateModal}
                closeUpdateModal={closeUpdateModal}
                recipe={selectedRecipe}
                onUpdateSuccess={refreshRecipes}
            />
            <h1>Recipes List Page</h1>
            {loading && recipes.length === 0 ? (
                <h2 className="mt-2">Loading... </h2>
            ) : (
                recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id ?? recipe._id}
                        recipe={recipe}
                        onClick={() => showModal(recipe)}
                        onDelete={() => onDeleteRecipe(recipe.id)}
                    />
                ))
            )}
        </div>
    );
}

export default RecipesList;