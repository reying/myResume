import React, { useContext } from 'react';
import styled from 'styled-components';
import logoImg from '../../image/logo.svg';
import signImg from '../../image/sign.svg';
import { Context } from '../Functions/context';

const NavBarStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #299B01;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 24px;
  margin-left: 15px;
`;

const ImgLogo = styled.img`
  width: 50px;
`;

const Login = styled.button`
  background-color: transparent;
  border-color: transparent;
  color: white;
  font-size: 16px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;

const LogOut = styled.span`
  font-size: 20px;
  font-weight: 700px;
  cursor: pointer;
  margin-right: 20px;
`;

const Figure = styled.figure`
  margin: 0 20px;
`;

export const NavBar = () => {
  const {auth: { authentification, logIn, logOut }} = useContext(Context);

  return (
    <NavBarStyled>
      <Logo>
        <ImgLogo src={logoImg} alt="лого"/>
        <H1>MrDonald's</H1>
      </Logo>
      {authentification ?
      <User>
        <Figure>
          <img src={signImg} alt={authentification.displayName}/>
          <figcaption>{authentification.displayName}</figcaption>
        </Figure>
        <LogOut title='Выйти' onClick={logOut}>X</LogOut>
      </User> :
      <Login onClick={logIn}>
        <Figure>
          <img src={signImg} alt="войти"/>
          <figcaption>войти</figcaption>
        </Figure>
      </Login>
      }
    </NavBarStyled>
  )
};