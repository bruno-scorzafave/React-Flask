import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function RecipeForm({ onSubmit, serverError, serverSuccess, recipe }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: recipe ? {
            title: recipe.title,
            description: recipe.description
        } : {}
    });

    useEffect(() => {
        if (serverSuccess) {
            reset();
        }
    }, [serverSuccess, reset]);
    
    return (
        <>
            <Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
                {serverError && (
                    <Alert variant="danger" className="mb-3">
                    {serverError}
                    </Alert>
                )}
                {serverSuccess && (
                    <Alert variant="success" className="mb-3">
                    {serverSuccess}
                    </Alert>
                )}
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter the recipe title"
                        {...register('title', { 
                            required: "Title is required",
                            maxLength:{value: 25, message:"Title must be 25 characters or less"} 
                        })}
                    />
                { errors.title && <span className="text-danger">{ errors.title.message }</span> }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        {...register('description', { 
                            required: "Description is required",
                            maxLength:{value: 255, message:"Description must be 255 characters or less"} 
                        })}
                    />
                { errors.description && <span className="text-danger">{ errors.description.message }</span>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default RecipeForm;