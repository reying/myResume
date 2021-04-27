import { useState } from 'react';

const getTopping = toppings => toppings.map(item => ({
  name: item,
  checked: false
}));

export function useToppings(openItem) {

  const readyTopping = openItem.topping ? openItem.topping :
    openItem.toppings ? getTopping(openItem.toppings) : [];
  const [toppings, setToppings] = useState(readyTopping);

  const checkToppings = index => {
    setToppings(toppings.map((item, i) => {
      const newItem = {...item}
      if (i === index) {
        newItem.checked = !newItem.checked;
      }
      return newItem;
    }));
  }

  return {toppings, checkToppings};
}