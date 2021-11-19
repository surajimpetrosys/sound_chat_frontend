// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

import {AppstyleWrapperStyled} from './Appstyle';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AppstyleWrapperStyled>
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
    </AppstyleWrapperStyled>
  );
}
