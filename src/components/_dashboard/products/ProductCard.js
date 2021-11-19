import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { product_id, title, description, SKU, Price, currency,Discount,Quantity,size,color,catogery,image } = product;
  const baseurl = 'http://3.23.210.57/soundradiobackend/images/product/';
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product_id && (
          <Label
            variant="filled"
            color={(product_id === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {title}
          </Label>
        )}
        <ProductImgStyle alt={SKU} src={baseurl+image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" component="span" noWrap>
            {title}
          </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled'
              }}
            >
              Discount - {Discount}%
              
            </Typography>
            &nbsp;&nbsp;
            Price- {Price}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
