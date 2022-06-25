import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterStateSlice, Sort, SortPropertyEnum } from './types';

const initialState: FilterStateSlice = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярности',
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
      // if (Object.keys(payload).length) {
      state.pageCount = Number(payload.pageCount);
      state.categoryId = Number(payload.categoryId);
      state.sort = payload.sort;
      // } else {
      //   state.pageCount = 1;
      //   state.categoryId = 0;
      //   state.sort = {
      //     name: 'популярности',
      //     sortProperty: SortPropertyEnum.RATING_DESC,
      //   };
      // }
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
