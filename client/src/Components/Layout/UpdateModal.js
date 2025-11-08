import { Modal } from "react-bootstrap";
import RecipeForm from "../Recipes/RecipeForm";
import { useState } from "react";

function UpdateModal({ showUpdateModal, closeUpdateModal, recipe, onUpdateSuccess }) {
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    
    const updateRecipe = (data) => {
        const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        
        const id = recipe.id ?? recipe._id;

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`,
            },
            body: JSON.stringify(data),
        };

        setServerError('');
        setServerSuccess('');

        fetch(`/recipes/recipes/${id}`, requestOptions)
        .then(response => {
            if (!response.ok) {
            setServerError('Failed to update recipe. Please try again.');
            return response.json().then(errorData => {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.msg}`);
            });
            }
            return response.json();
        })
        .then(() => {
            setServerSuccess("Update recipe successfully!");

            if (onUpdateSuccess) {
                onUpdateSuccess();
            }

            setTimeout(() => {
                closeUpdateModal();
            }, 1500);
        })
        .catch((error) => {
            console.error('Error:', error);
            setServerError('An error occurred while updating. Please try again.');
        });
    }

    const handleModalClose = () => {
        setServerError('');
        setServerSuccess('');
    }

    return (
        <Modal size="lg" show={showUpdateModal} onHide={closeUpdateModal} onExited={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RecipeForm
                    onSubmit={updateRecipe}
                    serverError={serverError}
                    serverSuccess={serverSuccess}
                    recipe={recipe}
                />
            </Modal.Body>
        </Modal>
    );
}

export default UpdateModal;