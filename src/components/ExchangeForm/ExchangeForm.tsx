import React, { useCallback, useEffect, useState } from 'react';
import * as S from './ExchangeForm.styled';
import { InputWithDropdown } from '../InputWithDropdown';
import { ReactComponent as SwapIcon } from '../../assets/icons/swap.svg';
import { FetchStatus, ICurrecy } from '../../types/common.types';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  getEstimatedExchangeAmountThunk, 
  getListOfCurrenciesThunk, 
  getMinExchangeAmountThunk 
} from '../../store/currencies-thunks';
import { selectCurrencies } from '../../store/currenciesSlice';

const ExchangeForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { 
    currencies, 
    currenciesLoadingStatus,
    minExchangeAmount,
    minExchangeAmountStatus,
  } = useAppSelector(selectCurrencies);

  const [from, setFrom] = useState<ICurrecy>();
  const [to, setTo] = useState<ICurrecy>();
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [isPairInactive, setIsPairInactive] = useState(false);
  const [isExchangeAmountLoading, setIsExchangeAmountLoading] = useState(false);

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
    dispatch(getListOfCurrenciesThunk())
      .unwrap()
      .then((res) => {
        setFrom(res[0]);
        setTo(res[1]);
      })
      .catch(() => {
        toast.error('Error loading currencies');
      });
  }, [dispatch]);

  useEffect(() => {
    if (from && to) {
      setIsExchangeAmountLoading(true);

      dispatch(getMinExchangeAmountThunk({ from: from.ticker, to: to.ticker }))
        .unwrap()
        .then((res) => {
          setFromInput(res);
          setIsPairInactive(false);
        })
        .catch((error) => {
          if (error === 'This pair is inactive') {
            setIsPairInactive(true);
          }
          toast.error(error);
        })
    }
  }, [from, to, dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timer) {
      clearTimeout(timer);
    }

    if (from && to && fromInput && Number(fromInput) >= Number(minExchangeAmount)) {
      setIsExchangeAmountLoading(true);

      timer = setTimeout(() => {
        dispatch(getEstimatedExchangeAmountThunk({from: from.ticker, to: to.ticker, fromInput}))
          .unwrap()
          .then((res) => {
            setToInput(res);
            setIsExchangeAmountLoading(false);
          })
          .catch(() => {
            setToInput('-');
            setIsExchangeAmountLoading(false);
          });      
      }, 1000);

    } else if (from && to && fromInput && Number(fromInput) < Number(minExchangeAmount)) {
      timer = setTimeout(() => {
        setToInput('-');
        setIsExchangeAmountLoading(false);
        toast.error('Out of min amount');
      }, 1000);  
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [from, to, fromInput, minExchangeAmount, dispatch]);

  return (
    <S.ExchangeForm onSubmit={onSubmit}>
      {
        currenciesLoadingStatus === FetchStatus.Fetching ? (
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
                isLoading={minExchangeAmountStatus === FetchStatus.Fetching}
              />
              <SwapIcon />
              <InputWithDropdown 
                activeCurrency={to} 
                onCurrencyChange={handleToChange} 
                currencies={currencies}
                inputValue={toInput}
                isDisabled={true}
                isLoading={isExchangeAmountLoading}
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
