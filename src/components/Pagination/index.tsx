import React from 'react';
import ReactPaginate from 'react-paginate';
import { params } from '../../utils/getParams';

import styles from './pagination.module.scss';

type PaginationProps = {
  onChangePage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      initialPage={Number(params.pageCount) ? Number(params.pageCount) - 1 : 0}
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
};

export default Pagination;
