import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectPizza } from '../../redux/slices/pizza/selectors';

import { params } from '../../utils/getParams';

import styles from './pagination.module.scss';

type PaginationProps = {
  onChangePage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = React.memo(({ onChangePage }) => {
  const { fullItems, status } = useSelector(selectPizza);
  return Math.ceil(fullItems.length / 4) === 1 ? null : (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      initialPage={Number(params.pageCount) ? Number(params.pageCount) - 1 : 0}
      pageRangeDisplayed={4}
      pageCount={status === 'loading' ? 3 : Math.ceil(fullItems.length / 4)}
    />
  );
});

export default Pagination;
