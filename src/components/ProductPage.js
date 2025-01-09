import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ProductCard from './ProductCard';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  gridContainer: {
    marginTop: '20px',
    animation: '$fadeIn 1s ease-out',
  },
  pageTitle: {
    textAlign: 'center',
    marginBottom: '40px',
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#333',
    letterSpacing: '1px',
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

const ProductPage = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(() => fetchProducts(), 3000);
  }, []);

  if (loading) {
    return (
      <Container className={classes.loaderContainer}>
        <CircularProgress size={60} color="primary" />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" className={classes.pageTitle}>
        Our Products
      </Typography>
      <Grid container spacing={4} className={classes.gridContainer}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
