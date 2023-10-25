import styled from 'styled-components';
import { Breakpoint } from '../../types/styles.types';

const Container = styled.section`
  max-width: 960px;
  margin: 220px auto;

  @media (max-width: ${Breakpoint.MobileTop}) {
    max-width: 328px;
    margin: 64px auto;
  }
`;

export default Container;
