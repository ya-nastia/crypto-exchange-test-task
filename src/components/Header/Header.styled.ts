import styled from "styled-components";
import { Breakpoint, FontFamily } from "../../types/styles.types";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  color: #282828;

  @media (max-width: ${Breakpoint.MobileTop}) {
    gap: 14px;
  }
`;

export const Header = styled.h2`
  font-family: ${FontFamily.RobotoLight};
  font-size: 50px;
  font-weight: 300;
  line-height: 120%;

  @media (max-width: ${Breakpoint.MobileTop}) {
    font-size: 40px;
  }
`;

export const SubHeader = styled.h4`
  font-size: 20px;
  font-weight: 400;
  line-height: 100%;
`;