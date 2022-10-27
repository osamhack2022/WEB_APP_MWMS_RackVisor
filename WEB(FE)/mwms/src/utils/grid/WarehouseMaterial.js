import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout"
import { axiosGet } from "../../api";

const ReactGridLayout = WidthProvider(RGL);
  
export default class WarehouseGridLayout extends React.PureComponent {
  static defaultProps = {
    className: "warehousegridlayout",
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 20,
    transformScale: 0.7,
    style:{backgroundColor: "#f4a460"},
    isDraggable: false,
    isResizable: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      popup: this.props.popup,
      currUnit: this.props.unitSelected,
      currHouse: this.props.houseSelected,
      items: [],
      newBoxCounter: 0,
      newDoorCounter: 0,
      newCabinetCounter: 0,
      iid: 0, //unique id for item
      layout: [],
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onAddCabinet = this.onAddCabinet.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
  }

  async componentDidMount() {
    const response = await axiosGet("/warehouses/" + (this.state.currHouse.id).toString());
    const newItems = response.itemlist ? JSON.parse(response.itemlist) : []   // id -> 현재 부대의 정보
    const newLayout = response.layout ? JSON.parse(response.layout) : [] // id -> 현재 창고의 정보
    console.log(JSON.stringify(response));
    this.setState({
      items: newItems,
      layout: newLayout,
    });
  }

  createElement(el) {
    if(el.type === "door") {
      return this.createDoorElement(el);
    } else if(el.type === "cabinet") {
      return this.createCabinetElement(el);
    } else {
      //ERROR
    }
  }

  createDoorElement(el) {
    const i = el.i;
    const iid = el.iid;
    return (
      <div key={i} data-grid={el} value={i} style={{backgroundColor: "#7f1d1d", justifyContent:"center"}} >
        <div value={i} className="rotate-[-45deg] text-xl align-middle text-center text-slate-100" color="white">{i}</div>
      </div>
    );
  }

  onCabinetClick(i) {
    this.props.setClick(i);
  }

  createCabinetElement(el) {
    const i = el.i;
    const iid = el.iid;
    return (
      <div onClick={this.onCabinetClick.bind(this, iid)} key={i} data-grid={el} style={{backgroundColor: "#1e3a8a", alignItems:"center",justifyContent:"center"}}>
        <div value={i} className="rotate-[-45deg] text-xl align-middle text-center text-slate-100" color="white">{i}</div>
      </div>
    );
  }

  onChangeItemName(value, iid)
  {
    let newItems = [...this.state.items];
    let newLayout = [...this.state.layout];

    let j;
    for(j = 0; j<newItems.length; j++)
    {
      let item = newItems[j];
      if(item.iid == iid)
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
    this.setState({
      items: this.state.items.concat({
        type: "door",
        i: "door" + this.state.newDoorCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 2,
        h: 1,
        iid: this.state.iid + 1,
      }),
      newDoorCounter: this.state.newDoorCounter + 1,
      iid: this.state.iid + 1,
    });
  }

  onAddCabinet() {
    this.setState({
      items: this.state.items.concat({
        type: "cabinet",
        i: "Cabinet" + this.state.newCabinetCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
        w: 4,
        h: 4,
        iid: this.state.iid + 1,
      }),
      newCabinetCounter: this.state.newCabinetCounter + 1,
      iid: this.state.iid + 1,
    });
  }

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
    for(j = 0; j<layout.length; j++)
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

  render() {
    return (
      <div style={{transform: this.state.popup & !this.props.addOne ? '' : ' scale(0.7) translate(0%, -10%)'}}>
        <ReactGridLayout 
          {...this.props}
          layout={this.state.gridLayout}
          items={this.state.items}
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