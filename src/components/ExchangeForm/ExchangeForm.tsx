import React, { useCallback, useEffect, useState } from 'react';
import * as S from './ExchangeForm.styled';
import { InputWithDropdown } from '../InputWithDropdown';
import { ReactComponent as SwapIcon } from '../../assets/icons/swap.svg';
import { getListOfCurrencies } from '../../api/api';
import { ICurrecy } from '../../types/common.types';
import { ThreeDots } from 'react-loader-spinner';

const ExchangeForm: React.FC = () => {
  const [currencies, setCurrencies] = useState<ICurrecy[]>([]);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [from, setFrom] = useState<ICurrecy>();
  const [to, setTo] = useState<ICurrecy>();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const handleFromChange = useCallback((currency: ICurrecy) => {
    setFrom(currency);
  }, []);

  const handleToChange = useCallback((currency: ICurrecy) => {
    setTo(currency);
  }, []);

  const handleFromInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    if (inputValue.startsWith(".")) {
      inputValue = '0' + inputValue
    }
    setFromInput(inputValue);
  }, []);

  useEffect(() => {
    (async() => {
      try {
        setCurrenciesLoading(true);

        const res = await getListOfCurrencies();
        setCurrencies(res);
        setFrom(res[0]);
        setTo(res[1]);
        
        setCurrenciesLoading(false);
      } catch (error) {
        console.log('getListOfCurrencies error', error);
        setCurrenciesLoading(false);
      }
    })();
  }, []);

  return (
    <S.ExchangeForm onSubmit={onSubmit}>
      {
        currenciesLoading ? (
          <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#11B3FE" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{justifyContent: 'center'}}
            visible={true}
          />
        ) : (
          <>
            <S.ExchangeInputs>
              <InputWithDropdown 
                activeCurrency={from} 
                onCurrencyChange={handleFromChange} 
                currencies={currencies}
                inputValue={fromInput}
                handleInputChange={handleFromInputChange}
              />
              <SwapIcon />
              <InputWithDropdown 
                activeCurrency={to} 
                onCurrencyChange={handleToChange} 
                currencies={currencies}
                inputValue={toInput}
              />
            </S.ExchangeInputs>

            <S.InputAndButtonContainer>
              <S.WalletInputContainer>
                <S.InputLabel>Your Ethereum address</S.InputLabel>
                <S.WalletInput />
              </S.WalletInputContainer>
              <S.ExchangeButton type='submit'>Exchange</S.ExchangeButton>
            </S.InputAndButtonContainer>
          </>
        )
      }
    </S.ExchangeForm>
  )
}

export default ExchangeForm;
