import React from 'react';
import { Provider } from 'react-redux';
import {store} from './app/Store/Store';
import AuthenStack from './app/Navigation/AuthenStack';
// import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
const customFonts = {
  'Taohuai': require('./assets/fonts/MN_Taohuai.ttf'),
  "PakkadThin": require("./assets/fonts/PakkadThin.ttf"),
  'Montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  'prompt': require('./assets/fonts/Prompt-Regular.ttf'),
  'prompt-bold': require('./assets/fonts/Prompt-Bold.ttf'),
  'Montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  


};
export default function App() {
  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return false
  }
  return (
    <Provider store={store}>
      <AuthenStack/>
    </Provider>
    
  );
}
