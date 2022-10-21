import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout"
import { getLSUnitList } from '../../pages/authorPages/UnitSelect'

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
      items: [],
      newBoxCounter: 0,
      newDoorCounter: 0,
      newCabinetCounter: 0,
      iid:0, //unique id for item
      layout: [],
      currUnit: this.props.unitSelected,
      currHouse: this.props.houseSelected,
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onAddCabinet = this.onAddCabinet.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onChangeItemName = this.onChangeItemName.bind(this);
  }

    // async componentDidMount() {
    //API 연결  
    //this.state.currUnit.name / id -> 현재 부대의 정보
    //this.state.currHouse.name / id -> 현재 창고의 정보
    //item 들고오기 없으면 기본 []
    //layout 들고오기 없으면 기본 []
    // this.setState({
    //   items:newItems,
    //   layout: newLayout,
    // });
    // }

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
        <div value={i} className="text-xl align-middle text-center text-slate-100" color="white">{i}</div>
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
      <div onClick={this.onCabinetClick.bind(this, i)} key={i} data-grid={el} style={{backgroundColor: "#1e3a8a", alignItems:"center",justifyContent:"center"}}>
        <div value={i} className="text-xl align-middle text-center text-slate-100" color="white">{i}</div>
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
    let unitName = this.props.unitSelected;
    if(unitName === null)
    {
      return (<div></div>);
    }
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
    if(house === undefined)
    {
      return (<div></div>);
    }
    
    house.gridLayout = this.state.layout;
    house.items = this.state.items;

    return (
      <div style={{transform: 'scale(0.7) translate(0%, 0%)'}}>
        <ReactGridLayout 
          {...this.props}
          layout={house.gridLayout}
          items={house.items}
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