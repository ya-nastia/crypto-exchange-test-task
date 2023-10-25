import React from 'react';
import * as S from './Header.styled';

const Header: React.FC = () => {
  return (
    <S.HeaderContainer>
      <S.Header>Crypto Exchange</S.Header>
      <S.SubHeader>Exchange fast and easy</S.SubHeader>
    </S.HeaderContainer>
  )
}

export default Header;
