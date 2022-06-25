import React from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import styles from './search.module.scss';

import searchIco from '../../assets/img/search.svg';
import closeIco from '../../assets/img/close.svg';
import { setSearchValue } from '../../redux/slices/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 1000),
    [],
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const change = e.target.value;
    setValue(change);
    updateSearchValue(change);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} width={22} height={22} src={searchIco} alt="searchIco" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img onClick={onClickClear} className={styles.clearIcon} src={closeIco} alt="closeIco" />
      )}
    </div>
  );
};

export default Search;
