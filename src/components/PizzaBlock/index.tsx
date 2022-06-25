import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addItem } from '../../redux/slices/cart/slice';
import { CartItem } from '../../redux/slices/cart/types';
import { selectCartItemById } from '../../redux/slices/cart/selectors';
import { Pizza } from '../../redux/slices/pizza/types';

const PizzaBlock: React.FC<Pizza> = ({ id, name, price, imageUrl, sizes, types }) => {
  const typeNames = ['традиционное', 'тонкое'];
  const [typeIndex, setTypeIndex] = React.useState(0);
  const [sizeIndex, setSizeIndex] = React.useState(0);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));

  const addedCount = cartItem?.count;

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      name,
      price,
      imageUrl,
      type: typeNames[typeIndex],
      size: sizes[sizeIndex],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img
        onClick={() => navigate(`/pizza/${id}`)}
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setTypeIndex(type)}
              className={type === typeIndex ? 'active' : ''}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setSizeIndex(index)}
              className={index === sizeIndex ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount && <i>{addedCount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
