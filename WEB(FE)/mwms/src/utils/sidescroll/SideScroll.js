import React, { useState, useRef, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./Arrow";
import Card from './Card';
import usePrevious from "./usePrevious";

const elemPrefix = "번 박스";
const getId = (index) => `${index}${elemPrefix}`;

const exampleItems = [{"id":"1번 박스"}]

function SideScroll({floor, idx, setFloor, setIdx}) {
  const [items, setItems] = useState(exampleItems);
  const [selected, setSelected] = useState("");
  const handleItemClick = (itemId) => () => setSelected(itemId);

  useEffect(() => {
    
  }, []);

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
      <div className="example">
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