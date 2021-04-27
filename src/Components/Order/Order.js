import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../Functions/context';
import { ButtonCheckout } from '../Style/ButtonCheckout';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems, formatCurrency } from '../Functions/secondoryFunction';
import { OrderTitle, Total, TotalPrice } from '../Style/OverallStyle';


const OrderStyled = styled.section`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 80px;
  left: 0;
  background-color: #fff;
  width: 380px;
  height: calc(100% - 80px);
  box-shadow: 3px 4px 5px rgba(0, 0, 0, .25);
  padding: 20px;
`;

const OrderContent = styled.div`
  flex-grow: 1;
`;

const OrderList = styled.ul``;

const EmptyList = styled.p`
  text-align: center;
`;



export const Order = () => {
  const {
    orders: { orders, setOrders },
    auth: {authentification, logIn},
    orderConfirm: {setOpenOrderConfirm}
  } = useContext(Context);
  const deleteItem = index => {
    const newOrders = orders.filter((item, i) => index !== i);
    setOrders(newOrders);
  };

  const total = orders.reduce((result, order) => totalPriceItems(order) + result, 0);

  const totalCounter = orders.reduce((result, order) => order.count + result, 0);

  return (
    <OrderStyled>
      <OrderTitle>ВАШ ЗАКАЗ</OrderTitle>
      <OrderContent>
        {orders.length ? 
        <OrderList>
          {orders.map((order, index) => <OrderListItem
            key={index}
            order={order}
            deleteItem={deleteItem}
            index={index}
          />)}
        </OrderList> :
        <EmptyList>Список заказов пуст</EmptyList>}
      </OrderContent>
      {orders.length ?
      <>
        <Total>
          <span>Итого</span>
          <span>{totalCounter}</span>
          <TotalPrice>{formatCurrency(total)}</TotalPrice>
        </Total>
        <ButtonCheckout onClick={() => {
          if (authentification) {
            setOpenOrderConfirm(true);
          } else {
            logIn()
          }
        }}>Оформить</ButtonCheckout>
      </> : null}
    </OrderStyled>
  )
};