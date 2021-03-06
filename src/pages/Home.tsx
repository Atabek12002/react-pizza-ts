import React from 'react';
import { useSelector } from 'react-redux';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { list } from '../components/Sort';

import { Categories, SortPopup, PizzaBlock, Skeleton, Pagination } from '../components';

import { Pizza } from '../redux/slices/pizza/types';
import { fetchPizzas, getFullPizza } from '../redux/slices/pizza/slice';
import { selectPizza } from '../redux/slices/pizza/selectors';

import { setPageCount, setCategoryId, setFilters } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';

import NotFound from './NotFound';
import { useAppDispatch } from '../redux/store';
import { params } from '../utils/getParams';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizza);

  const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter);
  const { sortProperty } = sort;

  const onChangeCategory = React.useCallback(
    (idx: number) => dispatch(setCategoryId(idx)),
    [dispatch],
  );

  const onChangePage = React.useCallback((num: number) => dispatch(setPageCount(num)), [dispatch]);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const order = sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortProperty.replace('-', '');
    const search = searchValue ? `search=${searchValue}` : ``;
    dispatch(fetchPizzas({ order, sortBy, category, search, pageCount: String(pageCount) }));
    dispatch(getFullPizza({ category }));
  };

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortProperty, pageCount, navigate]);

  // Если был первый рендер, то проверяем URL -параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          pageCount: Number(params.pageCount),
          sort: sort || list[0],
        }),
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getPizzas(), [categoryId, sortProperty, searchValue, pageCount]);

  const pizzas = items.map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(4)].map((_, i) => <Skeleton key={i} />);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <NotFound />
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
