import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './InputWithDropdown.styled';
import { ICurrecy } from '../../types/common.types';
import { FixedSizeList } from 'react-window';

interface IInputWithDopdownProps {
  currencies: any;
  activeCurrency: ICurrecy | undefined;
  onCurrencyChange: (currency: ICurrecy) => void;
  inputValue?: string;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithDropdown: React.FC<IInputWithDopdownProps> = ({
  currencies, 
  activeCurrency, 
  onCurrencyChange, 
  inputValue,
  handleInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = useCallback((currency: ICurrecy) => {
    onCurrencyChange(currency);
    setIsOpen(false);
  }, [onCurrencyChange]);

  const handleOpenChange = useCallback(() => {
    setIsOpen(current => !current);
  }, []);

  return (
    <S.InputGroup className="input-group">
      <S.Input 
        type="number" 
        className="form-control"
        aria-label="Text input with dropdown button" 
        placeholder={isOpen ? 'Search' : ''}
        isOpen={isOpen}
        value={inputValue}
        onChange={handleInputChange}
      />
      <S.DropdownButton
        className="btn btn-outline-secondary dropdown-toggle" 
        type="button"
        aria-expanded="false"
        isOpen={isOpen}
        onClick={handleOpenChange}
      >
        {
          !isOpen && (
            <span>
              {
                activeCurrency?.image && 
                <img src={activeCurrency.image} alt={`${activeCurrency?.name} icon`} /> 
              }
              <S.ActiveCurrency title={activeCurrency?.ticker}>{activeCurrency?.ticker}</S.ActiveCurrency>
            </span>
          )
        }
      </S.DropdownButton>
      <S.DropdownMenu className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        <FixedSizeList
          height={144}
          width="100%"
          itemSize={48}
          itemCount={currencies.length}
        >
          {({ index, style }) => {
            const currency = currencies[index];
            return (
              <S.DropdownItem
                className="dropdown-item"
                key={uuid()}
                onClick={() => handleCurrencyChange(currency)}
                style={style}
              >
                {currency.image ? <img src={currency.image} alt={`${currency.name} icon`} /> : <span></span>}
                <S.Currency>{currency.ticker}</S.Currency>
                <S.CurrecyAlter title={currency.name}>{currency.name}</S.CurrecyAlter>
              </S.DropdownItem>
            );
          }}
        </FixedSizeList>
      </S.DropdownMenu>
    </S.InputGroup>
  )
}

export default InputWithDropdown;
