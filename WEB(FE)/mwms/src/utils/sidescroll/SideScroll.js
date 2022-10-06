import React, { useState, useRef, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./Arrow";
import Card from './Card';
import usePrevious from "./usePrevious";

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

const exampleItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function SideScroll(exampleItem) {
  const [items, setItems] = useState(exampleItems);
  const [selected, setSelected] = useState("");
  const handleItemClick = (itemId) => () => setSelected(itemId);

  const addItem = () => {
    setItems((items) =>
      items.concat({ id: getId(String(Math.random()).slice(2, 5)) })
    );
    console.log(items);
  };
  
  const removeItem = () => {
    setItems((items) => {
      const newItems = [...items];
      newItems.splice(-1, 1);
      return newItems;
    });
  };

  const itemsPrev = usePrevious(items);
  const apiRef = useRef({});
  useEffect(() => {
    if (items.length > itemsPrev?.length) {
      apiRef.current?.scrollToItem?.(
        apiRef.current?.getItemElementById(items.slice(-1)?.[0]?.id)
      );
    }
  }, [items, itemsPrev]);

  return (
    <>
      <div className="example" style={{ paddingTop: "100px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {items.map(({ id }) => (
              <Card
                title={id}
                itemId={id}
                key={id}
                onClick={handleItemClick(id)}
                selected={id === selected}
              />
            ))}
            <div style={{ marginTop: "20px" }}>
              <button onClick={removeItem}>Remove item</button>
              <button onClick={addItem}>Add item</button>
            </div>
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default SideScroll;

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}