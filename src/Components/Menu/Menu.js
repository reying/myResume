import React from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { Banner } from './Banner';
import { useFetch } from '../Hooks/useFetch';
import preloaderImg from '../../image/preloader.svg';

const MenuStyled = styled.main`
  background-color: #ccc;
  margin-top: 80px;
  margin-left: 380px;
`;

const SectionMenu = styled.section`
  padding: 30px;
`;

const Preloader = styled.img`
  display: flex;
  width: 35%;
  margin-left: auto;
  margin-right: auto;
`;

export const Menu = () => {
  const res = useFetch();
  const dbMenu = res.response;

  return (
    <MenuStyled>
      <Banner/>
      {res.response ?
      <>
        <SectionMenu>
          <h2>Бургеры</h2>
          <ListItem 
            itemList={dbMenu.burger}
          />
        </SectionMenu>
        <SectionMenu>
          <h2>Закуски / Напитки</h2>
          <ListItem 
            itemList={dbMenu.other}
          />
        </SectionMenu>
      </> : res.error ?
      <Preloader src={preloaderImg} alt='прелоадер'/> :
      <div>Loading...</div>
      }
    </MenuStyled>
  )
};