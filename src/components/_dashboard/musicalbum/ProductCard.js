import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link,Avatar, Typography, Stack,CardContent } from '@material-ui/core';
import ReactPlayer from 'react-player';
import { alpha, styled } from '@material-ui/core/styles';

// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});
const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
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
  const { audio,
    author,
    duration,
    img,
    name } = product;

  return (
    <Card>
      <CardMediaStyle
          sx={{
            ...((name || name) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(name && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src={img}
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((name || name) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={name}
            src={img}
            sx={{
              ...((name || name) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />
          <CoverImgStyle alt={name} src={img} />
        </CardMediaStyle>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            Author- {author}
          </Typography>
        </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={name} /> */}
          <Typography variant="subtitle1">
          <TitleStyle
            color="inherit"
            variant="subtitle2"
            sx={{
              ...(name && { typography: 'h5', height: 60 }),
              ...((name || name) && {
                color: 'common.red'
              })
            }}
          >
            {name}
          </TitleStyle>
            <div className='player-wrapper'>
              <ReactPlayer
                url={audio}
                className='react-player'
                playing='false'
                width='200px'
                height='50px'
                controls='true'
                auto='false'

              />
            </div>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
