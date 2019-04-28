import Home from './Home';

import BookInfo from './BookInfo';
import Login from './Login'
import SignUp from './SignUp'
export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/book-info/:id',
    name: 'BookInfo',
    props: true,
    component: BookInfo
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '*',
    redirect: '/login'
  },
];


