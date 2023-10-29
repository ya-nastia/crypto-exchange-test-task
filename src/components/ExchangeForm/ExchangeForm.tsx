import React, { useCallback } from 'react';
import * as S from './ExchangeForm.styled';
import { InputWithDropdown } from '../InputWithDropdown';
import { ReactComponent as SwapIcon } from '../../assets/icons/swap.svg';

const ExchangeForm: React.FC = () => {

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <S.ExchangeForm onSubmit={onSubmit}>

      <S.ExchangeInputs>
        <InputWithDropdown />
        <SwapIcon />
        <InputWithDropdown />
      </S.ExchangeInputs>

      <S.InputAndButtonContainer>
        <S.WalletInputContainer>
          <S.InputLabel>Your Ethereum address</S.InputLabel>
          <S.WalletInput />
        </S.WalletInputContainer>
        <S.ExchangeButton type='submit'>Exchange</S.ExchangeButton>
      </S.InputAndButtonContainer>
    </S.ExchangeForm>
  )
}

export default ExchangeForm;
