import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout"
import EditableText from "../text/EditableText"
import { getLSUnitList } from '../../pages/authorPages/UnitSelect'

const ReactGridLayout = WidthProvider(RGL);



  
export default class WarehouseGridLayout extends React.PureComponent {
  static defaultProps = {
    className: "warehousegridlayout",
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 20,
    transformScale: 0.5,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newBoxCounter: 0,
      newDoorCounter: 0,
      newCabinetCounter: 0,
      iid:0, //unique id for item
      layout: [],
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddBox = this.onAddBox.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onAddCabinet = this.onAddCabinet.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
    
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
      <div key={i} data-grid={el} style={{backgroundColor: "#7f1d1d"}}>
        <EditableText value={i} iid={iid} handleChange={this.onChangeItemName} color="white"></EditableText>
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
      <div key={i} data-grid={el} style={{backgroundColor: "#1e3a8a"}}>
        <EditableText value={i} iid={iid} handleChange={this.onChangeItemName} color="white"></EditableText>
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
    const iid = el.iid;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#F9C38A"}}>
        <EditableText value={i} iid={iid} handleChange={this.onChangeItemName}></EditableText>
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

  onChangeItemName(value, iid)
  {
    console.log("[@@@@ onChangeItemName(value:" + value +", iid: " +iid + ") @@@@]");
    let newItems = this.state.items;
    let newLayout = this.state.layout;

    let j;
    for(j = 0; j<newItems.length; j++)
    {
      let item = newItems[j];
      if(item.iid === iid)
      {
        item.i = value;
        newLayout[j].i = value;
        break;
      }
    }

    this.setState({
      items:newItems,
      layout: newLayout,
    });

  }


  onAddDoor() {
    console.log("adding", "door" + this.state.newDoorCounter);
    this.setState({
      // Add a new door. It must have a unique key!
      items: this.state.items.concat({
        type: "door",
        i: "door" + this.state.newDoorCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 2,
        h: 1,
        iid: this.state.iid + 1,
      }),
      layout: this.state.layout.concat({
        i: "door" + this.state.newDoorCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 2,
        h: 1
      }),
      // Increment the counter to ensure key is always unique.
      newDoorCounter: this.state.newDoorCounter + 1,
      iid: this.state.iid + 1,
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
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 4,
        h: 4,
        iid: this.state.iid + 1,
      }),
      layout: this.state.layout.concat({
        i: "Cabinet" + this.state.newCabinetCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 4,
        h: 4
      }),
      // Increment the counter to ensure key is always unique.
      newCabinetCounter: this.state.newCabinetCounter + 1,
      iid: this.state.iid + 1,
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
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 4,
        h: 4,
        iid: this.state.iid + 1,
      }),
      layout: this.state.layout.concat({
        i: "box" + this.state.newBoxCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 4,
        h: 4
      }),
      // Increment the counter to ensure key is always unique.
      newBoxCounter: this.state.newBoxCounter + 1,
      iid: this.state.iid + 1,
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }



  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    let newItems = [];
    let j;
    for(j =0; j<layout.length; j++)
    {
      let item = this.state.items[j];
      item.i = layout[j].i
      item.x = layout[j].x;
      item.y = layout[j].y;
      item.w = layout[j].w;
      item.h = layout[j].h;
      newItems.push(item);
    }
    this.setState({
      layout: layout,
      items: newItems
    });
    
  }

  onRemoveBox(i) {
    console.log("removing item", i);
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
 
  }

  onRemoveDoor(i) {
    console.log("removing door", i);
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
  }

  onRemoveCabinet(i) {
    console.log("removing cabinet", i);
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
  }

  render() {

    // TODO: 서버로부터 unit(부대) 불러와야함...
    let unitName = this.props.unitSelected;
    let lsUnitList=  getLSUnitList();
    let lsUnit = lsUnitList.find( (e) => (e.name === unitName) );
    let hl;
    if(lsUnit === undefined)
    {
      hl = []
    }
    else
    {
      hl = lsUnit.houseList;
    }
    let house = hl.find( (e) => (e.name === this.props.houseSelected) );
    console.log("house: " + JSON.stringify(house));
    console.log("layout: " + JSON.stringify(this.state.layout));
    console.log("items: " + JSON.stringify(this.state.items));
    return (
      <div style={{transform: 'scale(0.5) translate(-50%, -50%)'}}>
        <div>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-2xl bg-[#F9C38A]" onClick={this.onAddBox}>박스 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-red-900" onClick={this.onAddDoor}>문 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-blue-900" onClick={this.onAddCabinet}>캐비넷 추가 + </button>
        </div>
        <ReactGridLayout 
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onChangeItemName={this.onChangeItemName}
          allowOverlap={false}
          compactType={null}
        >
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout> 
      </div>
    );
  }
}