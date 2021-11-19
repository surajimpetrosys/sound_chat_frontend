import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import {NavLink} from 'react-router-dom';

import ShopProductCard from './ProductCard';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <NavLink to ={`/dashboard/products/details/${product.id}`}>
          <ShopProductCard product={product} />
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
}
