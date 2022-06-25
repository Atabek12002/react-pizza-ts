import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../../api';
import { Pizza, PizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, search, pageCount } = params;
    try {
      const { data } = await api.get(
        `/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
      );
      return data;
    } catch (error) {
      alert('Ощибка при получений пиццы!');
    }
  },
);

const initialState: PizzaSliceState = {
  items: [],
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
  },
});

export default pizzaSlice.reducer;
