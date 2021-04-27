import { useState } from 'react';

export function useOrderConfirm() {
  const [openOrderConfirm, setOpenOrderConfirm] = useState(false);
  return { openOrderConfirm, setOpenOrderConfirm };
}