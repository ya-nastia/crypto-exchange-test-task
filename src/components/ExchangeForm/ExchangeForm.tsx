import React, { useCallback, useEffect, useState } from 'react';
import * as S from './ExchangeForm.styled';
import { InputWithDropdown } from '../InputWithDropdown';
import { ReactComponent as SwapIcon } from '../../assets/icons/swap.svg';
import { getEstimatedExchangeAmount, getListOfCurrencies, getMinExchangeAmount } from '../../api/api';
import { ICurrecy } from '../../types/common.types';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

const ExchangeForm: React.FC = () => {
  const [currencies, setCurrencies] = useState<ICurrecy[]>([]);
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [from, setFrom] = useState<ICurrecy>();
  const [to, setTo] = useState<ICurrecy>();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [isPairInactive, setIsPairInactive] = useState(false);

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

  useEffect(() => {
    if (from && to) {
      (async() => {
        try {
          const res = await getMinExchangeAmount(from.ticker, to.ticker);
          setMinAmount(res.minAmount);
          setFromInput(res.minAmount);
          setIsPairInactive(false);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data.error === 'pair_is_inactive') {
            setIsPairInactive(true);
            toast.error('This pair is inactive');
          }
          console.log('error getMinExchangeAmount', error);
        }
      })();
    }
  }, [from, to]);

  useEffect(() => {
    if (from && to && fromInput && Number(fromInput) >= Number(minAmount)) {
      (async() => {
        try {
          const res = await getEstimatedExchangeAmount(from.ticker, to.ticker, fromInput);
          setToInput(res.estimatedAmount);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.data.message === 'deposit_too_small') {
            setToInput('-');
          }
          console.log('getEstimatedExchangeAmount error', error);
        }
      })()
    } else if (from && to && fromInput && Number(fromInput) < Number(minAmount)) {
      setToInput('-');
      toast.error('Out of min amount');
    }
  }, [from, to, fromInput, minAmount]);

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
                isDisabled={isPairInactive}
              />
              <SwapIcon />
              <InputWithDropdown 
                activeCurrency={to} 
                onCurrencyChange={handleToChange} 
                currencies={currencies}
                inputValue={toInput}
                isDisabled={true}
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
