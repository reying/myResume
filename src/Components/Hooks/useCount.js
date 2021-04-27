import { useState } from 'react';

export function useCount(startCount) {
  const [count, setCount] = useState(startCount || 1);

  const onChange = e => setCount(e.target.value);

  return { count, setCount, onChange }
}