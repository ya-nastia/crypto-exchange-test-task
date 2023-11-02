import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getEstimatedExchangeAmount, 
  getListOfCurrencies, 
  getMinExchangeAmount 
} from "../api/api";
import { AxiosError } from "axios";

export const getListOfCurrenciesThunk = createAsyncThunk(
  'currencies/getListOfCurrenciesThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getListOfCurrencies();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getMinExchangeAmountThunk = createAsyncThunk(
  'currencies/getMinExchangeAmountThunk',
  async ({ from, to }: { from: string, to: string }, { rejectWithValue }) => {
    try {
      const res = await getMinExchangeAmount(from, to);
      return res.minAmount;
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        if (error.response?.data.error === 'pair_is_inactive') {
          message = 'This pair is inactive';
        } else {
          message = error.response?.data.message;
        }
      }
      return rejectWithValue(message || 'Some Error');
    }
  }
);

export const getEstimatedExchangeAmountThunk = createAsyncThunk(
  'currencies/getEstimatedExchangeAmountThunk',
  async (
    { from, to, fromInput }: { from: string, to: string, fromInput: string }, 
    { rejectWithValue }
  ) => {
    try {
      const res = await getEstimatedExchangeAmount(from, to, fromInput);
      return res.estimatedAmount;
    } catch (error) {
      let message = '';
      if (error instanceof AxiosError) {
        message = error.response?.data.message;
      }
      return rejectWithValue(message || 'Some Error');
    }
  }
);