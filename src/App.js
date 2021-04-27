import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { GlobalStyle } from './Components/Style/GlobalStyle';
import { NavBar } from './Components/NavBar/NavBar';
import { Menu } from './Components/Menu/Menu';
import { ModalItem } from './Components/Modal/ModalItem';
import { Order } from './Components/Order/Order';
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useOrders } from './Components/Hooks/useOrders';
import { useAuth } from './Components/Hooks/useAuth';
import { useTitle } from './Components/Hooks/useTitle';
import { OrderConfirm } from './Components/Order/OrderConfirm';
import { useOrderConfirm } from './Components/Hooks/useOrderConfirm';
import { Context } from './Components/Functions/context';

const firebaseConfig = {
  apiKey: "AIzaSyB6-NAFetK1n-Iz9VJvClTPUC8TL-M5yR8",
  authDomain: "mrdonalds-4e15a.firebaseapp.com",
  databaseURL: "https://mrdonalds-4e15a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mrdonalds-4e15a",
  storageBucket: "mrdonalds-4e15a.appspot.com",
  messagingSenderId: "105546296239",
  appId: "1:105546296239:web:f0c1121977e98a86dc9d5a"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const auth = useAuth(firebase.auth);
  const openItem = useOpenItem();
  const orders = useOrders();
  const orderConfirm = useOrderConfirm();
  // const firebaseDatabase = firebase.database;

  useTitle(openItem.openItem);

  return (
    <Context.Provider value={{
      auth,
      openItem,
      orders,
      orderConfirm,
      firebaseDatabase: firebase.database
    }}>
      <GlobalStyle/>
      <NavBar/>
      <Order/>
      <Menu/>
      { openItem.openItem && <ModalItem/> }
      { orderConfirm.openOrderConfirm && <OrderConfirm/> }
    </Context.Provider>
  );
}

export default App;
