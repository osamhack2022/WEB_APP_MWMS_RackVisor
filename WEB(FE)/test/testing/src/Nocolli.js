import { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import Tsg from "./Tsg";
import _ from "lodash";
const GridLayout = WidthProvider(Responsive);

const Drag = () => {
  // layout is an array of objects, see the demo for more complete usage
  const [layout,setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 1, },
  ]);
  const [cnt, setCnt] = useState(0);

  const add = () => {
    const newLay = [{i : "test", x:0, y:0, w:1, h:1}, ...layout];
    console.log(newLay);
    const newName = cnt.toString() + "test";
    setCnt(cnt + 1);
    setLayout([{i : newName, x:1, y:1, w:1, h:1}, ...layout]);
  }

  return (
    <div>
      <button onClick={add}>추가</button>
      <GridLayout
        className="layout"
        layout={layout}
        cols={{ lg: 12, md: 10, sm:6, xs: 4, xxs: 2}}
        rowHeight={30}
        onLayoutChange={e=>setLayout(e)}
        style={{background: "red"}}
      >
        {layout.map((init) => (
          <Tsg key={init.i} style={{background: "grey"}} word={init.i}/>
        ))}
      </GridLayout>
    </div>
  );
};

export default Drag;


/**
 * The `react-grid-layout` lib is not swapping items during horizontal dragover
 * Rather it moves the items into a new row
 * Since we need a static 3x3 row, let's fix that
 */
const fixLayout = (layout) => {
  // `y` is calculated by `h` in the layout object, since `h` is 20
  // first row will be 0, second 20, third 40
  const maxY = 3

  // when an item goes to a new row, there is an empty column in the maxY row
  // so here we find which columns exist
  // tslint:disable-next-line:max-line-length
  const maxRowXs = layout.map((item) => item.y === maxY ? item.x : null).filter((value) => value !== null)

  // xs or cols, we only have 3 cols
  const xs = [0,1,2,3]

  // find the missing col
  // tslint:disable-next-line:max-line-length
  const missingX = xs.find((value) => maxRowXs.every((maxRowX) => maxRowX !== value))

  // bring the item from the new row into maxY row
  // and place it in the missing column
  const fixedLayout = layout.map((item) => {
    if (item.y > maxY) {
      const fixedItem = {
        ...item,
        y: maxY,
        x: missingX
      }
      return fixedItem
    }
    return item
  })
  return fixedLayout
}