import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import { Footer } from 'modules/footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
