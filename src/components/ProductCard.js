import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    '&:hover': {
      transform: 'translateY(-7px)',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#fafafa',
    },
    backgroundColor: '#fff',
  },
  media: {
    height: 200,
    borderRadius: '12px 12px 0 0',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  content: {
    padding: '16px',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '1.1rem',
  },
  price: {
    fontSize: '1.2rem',
    color: '#d32f2f',
    marginTop: '10px',
    fontWeight: 'bold',
  },
  button: {
    marginTop: '15px',
    backgroundColor: '#1976d2',
    color: '#fff',
    borderRadius: '5px',
    padding: '8px 16px',
    textTransform: 'uppercase',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#145a9c',
    },
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  ratingText: {
    fontSize: '1rem',
    marginLeft: '5px',
    color: '#757575',
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const rating = product.rating?.rate || 4.5;

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        image={product.image}
        alt={product.title}
      />
      <CardContent className={classes.content}>
        <Typography variant="h6" className={classes.title} title={product.title}>
          {product.title}
        </Typography>
        <Typography variant="body1" className={classes.price}>
          ${product.price.toFixed(2)}
        </Typography>
        <div className={classes.ratingContainer}>
          <Typography variant="body2" className={classes.ratingText}>
            ⭐ {rating}
          </Typography>
        </div>
        <Button
          variant="contained"
          className={classes.button}
          component={Link}
          to={`/product/${product.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
