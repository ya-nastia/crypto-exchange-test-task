import React from 'react';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { InputWithDropdown } from './components/InputWithDropdown';

function App() {
  return (
    <Container>
      <Header />
      <InputWithDropdown />
    </Container>
  );
}

export default App;
