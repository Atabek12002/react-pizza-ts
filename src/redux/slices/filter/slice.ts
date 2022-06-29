import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { params } from '../../../utils/getParams';
import { FilterStateSlice, Sort, SortPropertyEnum } from './types';

const initialState: FilterStateSlice = {
  searchValue: '',
  categoryId: params.categoryId ? Number(params.categoryId) : 0,
  pageCount: params.pageCount ? Number(params.pageCount) : 1,
  sort: {
    name: 'популярности (DESC)',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, { payload }: PayloadAction<number>) {
      state.categoryId = payload;
    },
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
    setSort(state, { payload }: PayloadAction<Sort>) {
      state.sort = payload;
    },
    setPageCount(state, { payload }: PayloadAction<number>) {
      state.pageCount = payload;
    },
    setFilters(state, { payload }: PayloadAction<FilterStateSlice>) {
      state.pageCount = Number(payload.pageCount);
      state.categoryId = Number(payload.categoryId);
      state.sort = payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
