import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

const ReactGridLayout = WidthProvider(RGL);


export default class ScaledLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: 0,
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 20,
    transformScale: 0.5,
    verticalCompact: false
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = {
      items: [].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1)
        };
      }),
      newItemCounter: 0,
      newDoorCounter: 0,
      layout,
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddDoor}
            title="You can add a door by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveDoor.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  onAddDoor() {
    console.log("adding", "door" + this.state.newDoorCounter);
    this.setState({
      // Add a new door. It must have a unique key!
      items: this.state.items.concat({
        i: "door" + this.state.newDoorCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newDoorCounter: this.state.newDoorCounter + 1
    });
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "box" + this.state.newItemCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "box" + this.state.newItemCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newItemCounter: this.state.newItemCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
          <span className="text">{i}</span>
        </div>
      );
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing item", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
 
  }

  onRemoveDoor(i) {
    console.log("removing door", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString()
      };
    });
  }


  render() {
    return (
      <div style={{transform: 'scale(0.5) translate(-50%, -50%)'}}>
        <div>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-2xl" onClick={this.onAddItem}>Add box + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-red-900" onClick={this.onAddDoor}>Add door + </button>
        </div>
        <ReactGridLayout 
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {this.generateDOM()}
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
      </div>
    );
  }
}