import { Card } from 'react-bootstrap';

function PostCard(props) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Img 
        variant="top" 
        src={props.imageUrl} 
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>{props.createdBy}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;