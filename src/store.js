import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import firebase from 'firebase';
import {
  reactReduxFirebase,
  firebaseReducer,
  getFirebase
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import cartReducer from './reducers/cartReducer';
import sortingReducer from './reducers/sortingReducer';
// import firebaseConfig from './config/keys';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rrfConfig = {
  userProfile: 'users'
};
const firebaseConfig = {
  apiKey: "AIzaSyDYbxgXmcenKOjBq85nEDhGtTN3g3lita8",
  authDomain: "moia-66a44.firebaseapp.com",
  databaseURL: "https://moia-66a44.firebaseio.com",
  projectId: "moia-66a44",
  storageBucket: "moia-66a44.appspot.com",
  messagingSenderId: "871172353610",
  appId: "1:871172353610:web:9ef45b5d59760149bb80b3",
  measurementId: "G-PNZ8E0LK6G"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cart: cartReducer,
  sorting: sortingReducer
});

const initialState = {};

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(getFirebase)),
    reactReduxFirebase(firebase)
  )
);

export default store;
