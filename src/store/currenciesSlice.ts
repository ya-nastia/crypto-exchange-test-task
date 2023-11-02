import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { FetchStatus, ICurrecy } from '../types/common.types';
import { getEstimatedExchangeAmountThunk, getListOfCurrenciesThunk, getMinExchangeAmountThunk } from './currencies-thunks';

interface IInitialState {
  currencies: ICurrecy[];
  currenciesLoadingStatus: FetchStatus;
  minExchangeAmount: string;
  minExchangeAmountStatus: FetchStatus;
  estExchangeAmount: string;
}

const initialState: IInitialState = {
  currencies: [],
  currenciesLoadingStatus: FetchStatus.Initial,
  minExchangeAmount: '',
  minExchangeAmountStatus: FetchStatus.Initial,
  estExchangeAmount: '',
}

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListOfCurrenciesThunk.pending, (state) => {
      state.currenciesLoadingStatus = FetchStatus.Fetching;
      state.currencies = [];
    })
    builder.addCase(getListOfCurrenciesThunk.fulfilled, (state, action) => {
      state.currenciesLoadingStatus = FetchStatus.Success;
      state.currencies = action.payload;
    })
    builder.addCase(getListOfCurrenciesThunk.rejected, (state) => {
      state.currenciesLoadingStatus = FetchStatus.Error;
      state.currencies = [];
    })
    builder.addCase(getMinExchangeAmountThunk.pending, (state) => {
      state.minExchangeAmountStatus = FetchStatus.Fetching;
      state.minExchangeAmount = '';
    })
    builder.addCase(getMinExchangeAmountThunk.fulfilled, (state, action) => {
      state.minExchangeAmountStatus = FetchStatus.Success;
      state.minExchangeAmount = action.payload;
    })
    builder.addCase(getMinExchangeAmountThunk.rejected, (state) => {
      state.minExchangeAmountStatus = FetchStatus.Error;
      state.minExchangeAmount = '';
    })
    builder.addCase(getEstimatedExchangeAmountThunk.pending, (state) => {
      state.estExchangeAmount = '';
    })
    builder.addCase(getEstimatedExchangeAmountThunk.fulfilled, (state, action) => {
      state.estExchangeAmount = action.payload;
    })
    builder.addCase(getEstimatedExchangeAmountThunk.rejected, (state, action) => {
      state.estExchangeAmount = '';
    })
  },
})

export const selectCurrencies = (state: RootState) => state.currencies;

export default currenciesSlice.reducer;