import styled from 'styled-components';
import { Breakpoint, FontFamily } from '../../types/styles.types';

export const ExchangeForm = styled.form`
  width: 100%;
  margin-top: 60px;
`;

export const ExchangeInputs = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px;

  width: 100%;
  margin-bottom: 63px;

  @media (max-width: ${Breakpoint.MobileTop}) {
    flex-direction: column;
    gap: 16px;
    height: auto;
    margin-bottom: 79px;

    & svg {
      align-self: flex-end;
    }
  }
`;

export const InputAndButtonContainer = styled(ExchangeInputs)`
  gap: 28px;
  justify-content: space-between;

  @media (max-width: ${Breakpoint.MobileTop}) {
    gap: 16px;
  }
`;

export const WalletInputContainer = styled.div`
  position: relative;
  height: 50px;

  @media (max-width: ${Breakpoint.MobileTop}) {
    width: 100%;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  top: -30px;

  color: #282828;
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
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

  @media (max-width: ${Breakpoint.TabletTop}) {
    width: 700px;
  }

  @media (max-width: ${Breakpoint.MobileTop}) {
    width: 100%;
  }
`;

export const ExchangeButton = styled.button`
  height: 50px;
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

  transition: 0.2s;

  &:hover {
    background: #0095E0;
  }

  @media (max-width: ${Breakpoint.MobileTop}) {
    width: 100%;
  }
`;