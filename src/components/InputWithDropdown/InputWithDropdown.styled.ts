import styled from 'styled-components';
import { Breakpoint, FontFamily } from '../../types/styles.types';
import ArrowDownIcon from '../../assets/icons/arrow-down.svg'
import CloseIcon from '../../assets/icons/close.svg'

export const InputGroup = styled.div`
  width: 440px;
  height: 50px;

  @media (max-width: ${Breakpoint.MobileTop}) {
    width: 100%;
  }
`;

export const Input = styled.input<{ isOpen: boolean }>`
  padding: 14px 16px;

  color: #282828;
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;

  border-radius: ${({isOpen}) => isOpen ? '5px 0 0 0': '5px 0 0 5px'};
  border: 1px solid #E3EBEF;
  background: #F6F7F8;

  &:focus {
    background: #F6F7F8;
    border: 1px solid #E3EBEF;
    box-shadow: none;
  }

  &::placeholder {
    color: #80A2B6;
  }
`;

export const DropdownButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  padding: 14px 8px 14px 34px;

  color: #282828;
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  text-transform: uppercase;

  border-radius: ${({isOpen}) => isOpen ? '0 5px 0 0': '0 5px 5px 0'};
  border: 1px solid #E3EBEF;
  border-left: ${({isOpen}) => isOpen ? 'none': '1px solid #E3EBEF'};
  background: #F6F7F8;

  &::after {
    height: 16px;
    width: 16px;
    margin-left: ${({isOpen}) => isOpen ? 'auto !important' : 0};

    vertical-align: unset;

    border: none;
    background-image: url(${({isOpen}) => isOpen ? CloseIcon : ArrowDownIcon});
  }

  &:hover, &&:active {
    color: #282828;

    background: #F6F7F8;
    border: 1px solid #E3EBEF;
    border-left: ${({isOpen}) => isOpen ? 'none': '1px solid #E3EBEF'};
  }

  & span {
    display: flex;
    align-items: center;
  }

  & img {
    margin-right: 12px;
  }
`;

export const ActiveCurrency = styled.span`
  && {
    display: inline;
  }
  max-width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropdownMenu = styled.ul`
  width: 100%;
  padding: 0;

  background: #F6F7F8;
  border: 1px solid #E3EBEF;
  border-radius: 0 0 5px 5px;
  border-top: none;
  transform: translate3d(0px, 53px, 0px) !important;
`;

export const DropdownItem = styled.li`
  display: grid;
  grid-template-columns: 20px 1fr 6fr;
  align-items: center;
  padding: 12px 16px;

  cursor: pointer;

  &:hover {
    background: #EAF1F7;
  }
`;

export const Currency = styled.span`
  margin-left: 12px;

  color: #282828;

  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 23px;
  text-transform: uppercase;
`;

export const CurrecyAlter = styled(Currency)`
  color: #80A2B6;
  text-transform: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;