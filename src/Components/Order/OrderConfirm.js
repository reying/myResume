import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Functions/context';
import { Overlay } from '../Style/OverallStyle';
import { OrderTitle, Total, TotalPrice } from '../Style/OverallStyle';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { projection } from '../Functions/secondoryFunction';
import { totalPriceItems, formatCurrency } from '../Functions/secondoryFunction';

const Modal = styled.div`
  background-color: white;
  width: 600px;
  padding: 30px;
`;

const Text = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const rulesData = {
  name: ['name'],
  price: ['price'],
  count: ['count'],
  topping: ['topping', arr => arr.filter(obj => obj.checked).map(obj => obj.name)],
  choice: ['choice', item => item ? item : 'no choices']
}

const sendOrder = (dataBase, orders, authentification) => {
  const newOrder = orders.map(projection(rulesData));
  dataBase.ref('orders').push().set({
    nameClient: authentification.displayName,
    email: authentification.email,
    order: newOrder
  });
};

export function OrderConfirm() {
  const {
    orders: { orders, setOrders },
    auth: {authentification},
    orderConfirm: {setOpenOrderConfirm},
    firebaseDatabase
  } = useContext(Context);
  const dataBase = firebaseDatabase();
  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  return (
    <Overlay>
      <Modal>
        <OrderTitle>{authentification.displayName}</OrderTitle>
        <Text>Осталось только подтвердить ваш заказ</Text>
        <Total>
          <span>Итого</span>
          <TotalPrice>{formatCurrency(total)}</TotalPrice>
        </Total>
        <ButtonCheckout onClick={() => {
          sendOrder(dataBase, orders, authentification);
          setOrders([]);
          setOpenOrderConfirm(false);
        }}>Подтвердить</ButtonCheckout>
      </Modal>
    </Overlay>
  )
}