import { useState } from 'react';

export function useOpenItem() {
  const [openItem, setOpenItem] = useState(null);
  return { openItem, setOpenItem };
}