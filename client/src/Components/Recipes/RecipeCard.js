import { Card, Button } from 'react-bootstrap';

export default function RecipeCard({ recipe, onClick, onDelete }) {
  return (
    <Card key={recipe.id ?? recipe._id} className='mb-3'>
        <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <p>{recipe.description}</p>
            <Button variant="primary" onClick={onClick}>Update</Button>
            <Button variant="danger" className="ms-2" onClick={onDelete}>Delete</Button>
        </Card.Body>
    </Card>
  );
}