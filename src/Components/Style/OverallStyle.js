import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 20;
`;

export const OrderTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

export const Total = styled.div`
  display: flex;
  margin: 0 0 40px;
  & span:first-child {
    flex-grow: 1;
  }
`;

export const TotalPrice = styled.span`
  text-align: right;
  min-width: 65px;
  margin-left: 50px;
`;