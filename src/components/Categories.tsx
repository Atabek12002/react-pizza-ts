import React from 'react';

type categoriesR = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<categoriesR> = React.memo(({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
