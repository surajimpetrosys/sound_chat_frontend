import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

Logo1.propTypes = {
  sx: PropTypes.object
};

export default function Logo1({ sx }) {
  return <Box component="img" src="/static/soundpic.png" sx={{ width: 40,  ...sx }} style={{width:'35%',margin:'0 auto'}}/>;
}
 