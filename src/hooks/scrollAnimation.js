import { useEffect, useState } from 'react';

export default function useScrollAnimation(items) {
  const [itemIds, setItemIds] = useState([]);

  useEffect(() => {
    function checkItems(e) {
      const viewportHeight = window.innerHeight;

      let DOMItems = [];

      if (items.length) {
        items.forEach((item) => {
          const DOMItem = document.getElementById(item._id);
          DOMItems = [...DOMItems, DOMItem];
        });
        DOMItems.forEach((DOMItem) => {
          const boxTop = DOMItem.getBoundingClientRect().top;
          const boxHeight = DOMItem.getBoundingClientRect().height;
          if (
            boxTop + boxHeight / 2 < viewportHeight &&
            boxTop + boxHeight > 0
          ) {
            const isExists = itemIds.find((id) => id === DOMItem.id);
            if (!isExists) {
              setItemIds([...itemIds, DOMItem.id]);
            }
          }
          if (boxTop + boxHeight / 2 < 0) {
            const isExists = itemIds.find((id) => id === DOMItem.id);
            if (isExists) {
              setItemIds(itemIds.filter((id) => id !== DOMItem.id));
            }
          }
        });
      }
    }
    window.addEventListener('scroll', checkItems);
    return () => {
      window.removeEventListener('scroll', checkItems);
    };
  }, [items, itemIds]);

  return { itemIds };
}
