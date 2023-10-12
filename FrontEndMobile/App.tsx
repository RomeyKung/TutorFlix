import React from 'react';
import { Provider } from 'react-redux';
import {store} from './app/Store/Store';
import AuthenStack from './app/Navigation/AuthenStack';


export default function App() {
  return (
    <Provider store={store}>
      <AuthenStack/>
    </Provider>
    
  );
}