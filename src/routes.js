import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import HomePage from './pages/guest/HomePage';
import MainPage from './components/sidebar/MainPage';
import Words from './pages/admin/Words';
import Tags from './pages/admin/Tags';
import Categories from './pages/admin/Categories';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/ad",
      element: <MainPage />,
      children: [
        { element: <Words to="/ad" />, index: true },
        { path:"words", element: <Words />},
        { path:"tags", element: <Tags />},
        { path:"categories", element: <Categories />},
      ]
    }
  ]);

  return routes;
}
