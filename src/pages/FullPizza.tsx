import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

type TPizza = {
  imageUrl: string;
  name: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<TPizza>();

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получений пиццы');
        navigate('/');
      }
    })();
  }, []);

  if (!pizza) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="full-pizza" />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
