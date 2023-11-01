import React from 'react';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { ExchangeForm } from './components/ExchangeForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Container>
        <Header />
        <ExchangeForm />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
