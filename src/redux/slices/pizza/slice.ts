import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../api';
import { Pizza, PizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, pageCount } = params;
    try {
      const res = await api.get(
        `/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
      );
      return res.data;
    } catch (error) {
      alert('Ощибка при получений пиццы!');
    }
  },
);

export const getFullPizza = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/getFullPizza',
  async (params) => {
    try {
      const { category } = params;
      const res = await api.get(`/items?${category}`);
      return res.data;
    } catch (error) {
      alert('Ощибка при получений пиццы!');
    }
  },
);

const initialState: PizzaSliceState = {
  items: [],
  fullItems: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCESS;
      state.items = payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });

    builder.addCase(getFullPizza.pending, (state) => {
      state.status = Status.LOADING;
      state.fullItems = [];
    });
    builder.addCase(getFullPizza.fulfilled, (state, { payload }) => {
      state.status = Status.SUCCESS;
      state.fullItems = payload;
    });
    builder.addCase(getFullPizza.rejected, (state) => {
      state.status = Status.ERROR;
      state.fullItems = [];
    });
  },
});

export default pizzaSlice.reducer;
