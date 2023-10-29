import React from 'react';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { InputWithDropdown } from './components/InputWithDropdown';
import { ExchangeForm } from './components/ExchangeForm';

function App() {
  return (
    <Container>
      <Header />
      <ExchangeForm />
    </Container>
  );
}

export default App;
