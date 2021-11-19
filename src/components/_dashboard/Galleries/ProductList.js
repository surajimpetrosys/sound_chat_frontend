import { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

// ProductList.propTypes = {
//   products: PropTypes.array.isRequired
// };

export default function ProductList({ products, ...other }) {
  const [productss,setproductss]=useState([])
  useEffect(()=> {
    setproductss(products)
}, [products])
  return (
    <Grid container spacing={3} {...other}>
      {productss.map((product) => (
        <Grid item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
