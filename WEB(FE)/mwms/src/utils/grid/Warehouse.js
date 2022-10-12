import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout"
import EditableText from "../text/EditableText"
import { useAuth } from '../../routes/AuthContext'
import { getLSUnitList } from '../../pages/authorPages/UnitSelect'

const ReactGridLayout = WidthProvider(RGL);

export default class WarehouseGridLayout extends React.PureComponent {
  static defaultProps = {
    className: "warehousegridlayout",
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 20,
    transformScale: 0.5,
    verticalCompact: false
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newBoxCounter: 0,
      newDoorCounter: 0,
      newCabinetCounter: 0,
      layout: [],
    };
    this.onAddBox = this.onAddBox.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onAddCabinet = this.onAddCabinet.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  createElement(el)
  {
    if(el.type === "box")
    {
      return this.createBoxElement(el);
    }
    else if(el.type === "door")
    {
      return this.createDoorElement(el);
    }
    else if(el.type === "cabinet")
    {
      return this.createCabinetElement(el);
    }
    else
    {
      //ERROR
    }

  }
 

  createDoorElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#7f1d1d", color: "white"}}>
        <EditableText value={i}></EditableText>
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

  createCabinetElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#1e3a8a", color: "white"}}>
        <EditableText value={i}></EditableText>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveCabinet.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  createBoxElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i =el.i;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#F9C38A"}}>
        <EditableText value={i}></EditableText>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveBox.bind(this, i)}
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
        type: "door",
        i: "door" + this.state.newDoorCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 1
      }),
      // Increment the counter to ensure key is always unique.
      newDoorCounter: this.state.newDoorCounter + 1
    });
  }

  onAddCabinet() {
    console.log("adding", "cabinet" + this.state.newCabinetCounter);
    this.setState({
      // Add a new door. It must have a unique key!
      items: this.state.items.concat({
        type: "cabinet",
        i: "Cabinet" + this.state.newCabinetCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 4
      }),
      // Increment the counter to ensure key is always unique.
      newCabinetCounter: this.state.newCabinetCounter + 1
    });
  }

  onAddBox() {
    /*eslint no-console: 0*/
    console.log("adding", "box" + this.state.newBoxCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        type: "box",
        i: "box" + this.state.newBoxCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 4
      }),
      // Increment the counter to ensure key is always unique.
      newBoxCounter: this.state.newBoxCounter + 1
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
    console.log("[@@@@ onLayoutChange() @@@@]");
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveBox(i) {
    console.log("removing item", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
 
  }

  onRemoveDoor(i) {
    console.log("removing door", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  onRemoveCabinet(i) {
    console.log("removing cabinet", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {


    return (
      <div style={{transform: 'scale(0.5) translate(-50%, -50%)'}}>
        <div>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-2xl bg-[#F9C38A]" onClick={this.onAddBox}>박스 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-red-900" onClick={this.onAddDoor}>문 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-blue-900" onClick={this.onAddCabinet}>캐비넷 추가 + </button>
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