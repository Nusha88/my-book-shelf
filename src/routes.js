import BookInfo from './BookInfo';
import Home from './Home';
import firebase from 'firebase'

import Login from './Login'
import SignUp from './SignUp'
export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/book-info/:title',
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
];

