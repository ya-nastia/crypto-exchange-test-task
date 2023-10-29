import React, { ReactElement, useCallback, useState } from 'react';
import * as S from './InputWithDropdown.styled';
import { ReactComponent as BtcIcon } from '../../assets/icons/btc.svg';
import { ReactComponent as EthIcon } from '../../assets/icons/eth.svg';
import { ReactComponent as LtcIcon } from '../../assets/icons/ltc.svg';
import { ReactComponent as XmrIcon } from '../../assets/icons/xmr.svg';

const currencies = [
  {
    icon: <BtcIcon />,
    name: 'BTC', 
    longName: 'Bitcoin',
  },
  {
    icon: <EthIcon />,
    name: 'Eth', 
    longName: 'Ethereum',
  },
  {
    icon: <LtcIcon />,
    name: 'LTC', 
    longName: 'Litecoin',
  },
  {
    icon: <XmrIcon />,
    name: 'XMR', 
    longName: 'Monero',
  },
]

const InputWithDopdown: React.FC = () => {
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = useCallback((currency: { icon: ReactElement, name: string, longName: string }) => {
    setActiveCurrency(currency);
    setIsOpen(false);
  }, []);

  const handleOpenChange = useCallback(() => {
    setIsOpen(current => !current);
  }, []);

  return (
    <S.InputGroup className="input-group">
      <S.Input 
        type="text" 
        className="form-control"
        aria-label="Text input with dropdown button" 
        placeholder={isOpen ? 'Search' : ''}
        isOpen={isOpen}
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
              {activeCurrency.icon}
              {activeCurrency.name}
            </span>
          )
        }
      </S.DropdownButton>
      <S.DropdownMenu className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''}`}>
        {
          currencies.map(currency => {
            return (
              <S.DropdownItem 
                className="dropdown-item" 
                key={currency.longName}
                onClick={() => handleCurrencyChange(currency)}
              >
                {currency.icon}
                <S.Currency>{currency.name}</S.Currency>
                <S.CurrecyAlter>{currency.longName}</S.CurrecyAlter>
              </S.DropdownItem>
            )
          })
        }
      </S.DropdownMenu>
    </S.InputGroup>
  )
}

export default InputWithDopdown;
