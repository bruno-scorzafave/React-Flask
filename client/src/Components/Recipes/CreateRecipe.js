import { useState } from 'react';
import RecipeForm from './RecipeForm';

function CreateRecipePage() {
    
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    
    const createRecipe = (data) => {
        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,
            },
            body: JSON.stringify(data),
        };

        setServerError('');
        setServerSuccess('');

        fetch('/recipes/recipes', requestOptions)
        .then(response => {
          if (!response.ok) {
            setServerError('Failed to create recipe. Please try again.');
            return response.json().then(errorData => {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.msg}`);
            });
          }
          return response.json();
        })
        .then(() => {
          setServerSuccess("Created recipe successfully!");
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    
    return (
        <div className="home">
            <h1>Create a Recipe</h1>
            <RecipeForm onSubmit={createRecipe} serverError={serverError} serverSuccess={serverSuccess} />
        </div>
    );
}

export default CreateRecipePage;