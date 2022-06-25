import React from 'react';
import { useNavigate } from 'react-router-dom';

import notPizza from '../../assets/img/not-pizza.png';

import './notfound.scss';

const NotFoundBlock: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="notpage text-center">
      <div className="d-flex align-center justify-center pb-40">
        <h2 className="notpage-n1">4</h2>
        <img width={200} height={200} src={notPizza} alt="notPizza" />
        <h2 className="notpage-n2">4</h2>
      </div>
      <h1 className="pb-20">ой... страница не найдена</h1>
      <p className="pb-35">Страница, которую вы искали, не существует</p>
      <button onClick={() => navigate('/')}>Вернуться домой</button>
    </div>
  );
};

export default NotFoundBlock;
