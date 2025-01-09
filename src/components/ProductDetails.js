import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, CircularProgress, Container, Typography, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  notFoundContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  productContainer: {
    marginTop: '20px',
    animation: '$fadeIn 1s ease',
  },
  productImage: {
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    animation: '$slideIn 1s ease-out',
  },
  productDescription: {
    marginTop: '20px',
    lineHeight: '1.6',
    color: '#555',
  },
  productCategory: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#1976d2',
  },
  priceTag: {
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: '15px',
    fontSize: '1.5rem',
  },
  infoCard: {
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  '@keyframes slideIn': {
    from: { transform: 'translateX(-50px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
});

const ProductDetails = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress size={60} color="primary" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className={classes.notFoundContainer}>
        <Typography variant="h5">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container className={classes.productContainer}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.title}
            className={classes.productImage}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.infoCard}>
            <CardContent>
              <Typography className={classes.priceTag}>${product.price}</Typography>
              <Typography
                variant="body1"
                className={classes.productDescription}
              >
                {product.description}
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.productCategory}
              >
                Category: {product.category}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
