import axios from "axios";

const apiKey = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';

const api = axios.create({
  baseURL: 'https://api.changenow.io/v1',
});

export const getListOfCurrencies = async () => {
  const { data } = await api.get(`/currencies?active=true&fixedRate=true`);
  return data;
};

export const getMinExchangeAmount = async (from: string, to: string) => {
  const { data } =  await api.get(`/min-amount/${from}_${to}?api_key=${apiKey}`);
  return data;
}

export const getEstimatedExchangeAmount = async (
  from: string, 
  to: string,
  amount: string,
) => {
  const { data } = await api.get(`/exchange-amount/${amount}/${from}_${to}/?api_key=${apiKey}`);
  return data;
}