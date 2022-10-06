import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */

export default class AddRemoveLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      newCounter: 0,
      items: []
    };
    
    if (JSON.parse(JSON.stringify(originalLayouts))['lg']) {
      this.state.items = JSON.parse(JSON.stringify(originalLayouts))['lg'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['md']) {
      this.state.items = JSON.parse(JSON.stringify(originalLayouts))['md'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['sm']) {
      this.state.items = JSON.parse(JSON.stringify(originalLayouts))['sm'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xs']) {
      this.state.items = JSON.parse(JSON.stringify(originalLayouts))['xs'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xxs']) {
      this.state.items = JSON.parse(JSON.stringify(originalLayouts))['xxs'];
    }

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  static get defaultProps () {
    return {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    preventCollision: true
  }};

  resetLayout() {
    this.setState({ layouts: {} });
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        <span className="text">{i}</span>
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}>x</span>
        <span className="change" onClick={this.onChangeName.bind(this, i)}>부대명 바꾸기</span>
      </div>
    );
  }

  onAddItem() {
    console.log("adding", "n" + this.state.newCounter);
    let name = prompt("부대명을 입력해주세요");
    this.setState({
      items: this.state.items.concat({
        i: name,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 6,
        hover: false
      }),
      newCounter: this.state.newCounter + 1
    });
  }

  onHover(i) {
    let findIndex = "";
    if (JSON.parse(JSON.stringify(originalLayouts))['lg']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['lg'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['md']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['md'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['sm']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['sm'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xs']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['xs'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xxs']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['xxs'];
    }
    findIndex = findIndex.findIndex(element => element.i === i);
    let copyArray = [...this.state.items];
    if(findIndex !== -1) {
      copyArray[findIndex] = {...copyArray[findIndex], hover: true};
    }
    this.setState({ items: copyArray });
  }

  onHoverEnd(i) {
    let findIndex = "";
    if (JSON.parse(JSON.stringify(originalLayouts))['lg']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['lg'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['md']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['md'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['sm']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['sm'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xs']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['xs'];
    } else if (JSON.parse(JSON.stringify(originalLayouts))['xxs']) {
      findIndex = JSON.parse(JSON.stringify(originalLayouts))['xxs'];
    }
    findIndex = findIndex.findIndex(element => element.i === i);
    let copyArray = [...this.state.items];
    if(findIndex !== -1) {
      copyArray[findIndex] = {...copyArray[findIndex], hover: false};
    }
    this.setState({ items: copyArray });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout, layouts, items) {
    saveToLS("layouts", layouts);
    this.setState({ layouts: layouts, });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  onChangeName(i) {
    const findIndex = this.state.layouts['md'].findIndex(element => element.i === i);
    let copyArray = [...this.state.items];
    let changeName = prompt("부대명 변경할 이름 입력");
    if(findIndex !== -1) {
      copyArray[findIndex] = {...copyArray[findIndex], i: changeName};
    }
    this.setState({ items: copyArray });
  }

  render() {
    return (
      <div>
        <button onClick={this.onAddItem}>부대 추가</button>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm:6, xs: 4, xxs: 2}}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
          onBreakpointChange={this.onBreakpointChange}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("unitManage")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "unitManage",
      JSON.stringify({
        [key]: value
      })
    );
  }
}