import styled from 'styled-components';
import { Breakpoint } from '../../types/styles.types';

const Container = styled.section`
  width: 960px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;

  @media (max-width: ${Breakpoint.TabletTop}) {
    width: 90%;
    margin: 90px auto;
  }

  @media (max-width: ${Breakpoint.MobileTop}) {
    width: 328px;
    margin: 64px auto;
  }
`;

export default Container;
