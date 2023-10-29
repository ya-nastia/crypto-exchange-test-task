import styled from 'styled-components';
import { FontFamily } from '../../types/styles.types';

export const ExchangeForm = styled.form`
  width: 100%;
  margin-top: 60px;
`;

export const ExchangeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  width: 100%;
  height: 50px;
  margin-bottom: 63px;
`;

export const InputAndButtonContainer = styled(ExchangeInputs)`
  gap: 32px;
`;

export const WalletInputContainer = styled.div`
  position: relative;
`;

export const InputLabel = styled.label`
  position: absolute;
  top: -30px;
`;

export const WalletInput = styled.input`
  width: 723px;
  height: 100%;
  padding: 14px 16px;

  border-radius: 5px;
  border: 1px solid #E3EBEF;
  background: #F6F7F8;

  &:focus {
    outline: none;
  }
`;

export const ExchangeButton = styled.button`
  height: 100%;
  padding: 15px 59px;

  color: #FFF;
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0.48px;
  text-transform: uppercase;

  background: #11B3FE;
  border: none;
  border-radius: 5px;
`;