import { useEffect } from 'react';

export function useTitle(openItem) {
  useEffect(() => {
    document.title = openItem ? openItem.name : "MrDonald's";
  }, [openItem]);
}