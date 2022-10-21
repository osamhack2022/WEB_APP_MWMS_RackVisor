import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout"
import EditableText from "../text/EditableText"
import { getLSUnitList } from '../../pages/authorPages/UnitSelect'
import { axiosGet, axiosPut } from "../../api";

const ReactGridLayout = WidthProvider(RGL);
  
export default class WarehouseGridLayout extends React.PureComponent {
  static defaultProps = {
    className: "warehousegridlayout",
    rowHeight: 50,
    onLayoutChange: function() {},
    cols: 20,
    transformScale: 0.7,
    style:{backgroundColor: "#f4a460"},
  };

  constructor(props) {
    super(props);

    this.state = {
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
    // this.onAddBox = this.onAddBox.bind(this);
    this.onAddDoor = this.onAddDoor.bind(this);
    this.onAddCabinet = this.onAddCabinet.bind(this);
    this.onLocalSave = this.onLocalSave.bind(this);
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
      cursor: "pointer",
      fontSize: "30px",
      color: "white"
    };
    const i = el.i;
    const iid = el.iid;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#7f1d1d", justifyContent:"center"}}>
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
      cursor: "pointer", 
      fontSize: "30px",
      color: "white"
    };
    const i = el.i;
    const iid = el.iid;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#1e3a8a", alignItems:"center",justifyContent:"center"}}>
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

  onNewName(iid) {
    let value = alert("새로운 이름을 입력해주세요");
    this.onChangeItemName(value, iid);
  }

  createBoxElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      fontsize: "30px",
      color: "white"
    };
    const i =el.i;
    const iid = el.iid;
    return (
      <div key={i} data-grid={el} style={{backgroundColor: "#F9C38A", alignItems:"center", justifyContent:"center"}}>
        <EditableText value={i} iid={iid} handleChange={this.onNewName.bind(this, iid)}></EditableText>
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

  onChangeItemName(value, iid) {
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
      // Increment the counter to ensure key is always unique.
      newDoorCounter: this.state.newDoorCounter + 1,
      iid: this.state.iid + 1,
    });
  }

  async onLocalSave() {
    //API
    //this.state.currHouse / this.state.currUnit ->  과 관련해서 정보를 받아서 body를 구성해서 여기서 뿌리면 된다
    let cabinetList = [];
    this.state.items.filter(item => item.type == "cabinet") //캐비넷 하나씩 만들어서 array 하나씩 추가해줘야 한다 -> cabinet 원소 하나씩 넣어주면 된다
    //그다음에 -> items 원소 중 key 로 해서 unique id 라는 property 를 하나 더 추가해줘야 한다
    //그걸 서버에 업로드 해주거나 서버에서 return 을 해줘야 한다 그니까 cabinet 에 고유한 id 가 박혀있는 걸 줘야 함.  서버에서 나중에 불러올 때
  }

  onAddCabinet() {
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
      // Increment the counter to ensure key is always unique.
      newCabinetCounter: this.state.newCabinetCounter + 1,
      iid: this.state.iid + 1,
    });
  }

  // onAddBox() {
  //   /*eslint no-console: 0*/
  //   this.setState({
  //     // Add a new item. It must have a unique key!
  //     items: this.state.items.concat({
  //       type: "box",
  //       i: "box" + this.state.newBoxCounter,
  //       x: (this.state.items.length * 4) % (this.state.cols || 12),
  //       y: (this.state.items.length * 4) % (this.state.rowHeight || 12),
  //       w: 4,
  //       h: 4,
  //       iid: this.state.iid + 1,
  //     }),
  //     // Increment the counter to ensure key is always unique.
  //     newBoxCounter: this.state.newBoxCounter + 1,
  //     iid: this.state.iid + 1,
  //   });
  // }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }



  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    console.log("변경1 : " + JSON.stringify(layout));
    console.log("변경2 : " + JSON.stringify(this.state.items));
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
      items: newItems,
    });
    
  }

  onRemoveBox(i) {
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
 
  }

  onRemoveDoor(i) {
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
  }

  onRemoveCabinet(i) {
    this.setState({ items: _.reject(this.state.items, { i: i }), layout:_.reject(this.state.layout, {i:i}) });
  }

  render() {

    // // TODO: 서버로부터 unit(부대) 불러와야함...
    // let unitName = this.props.unitSelected;
    // if(unitName === null)
    // {
    //   return (<div></div>);
    // }
    // let lsUnitList=  getLSUnitList();
    // let lsUnit = lsUnitList.find( (e) => (e.name === unitName) );
    // let hl;
    // if(lsUnit === undefined)
    // {
    //   hl = []
    // }
    // else
    // {
    //   hl = lsUnit.houseList;
    // }
    // let house = hl.find( (e) => (e.name === this.props.houseSelected) );
    // if(house === undefined)
    // {
    //   return (<div></div>);
    // }
    
    // house.gridLayout = this.state.layout;
    // house.items = this.state.items;
    // house.iidCnt = this.state.iid;

    return (
      <div className="w-[100rem]"style={{transform: 'scale(0.7) translate(0%, -20%)'}}>
        <div>
          {/* <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-2xl bg-[#F9C38A]" onClick={this.onAddBox}>박스 추가 + </button> */}
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-red-900" onClick={this.onAddDoor}>문 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-blue-900" onClick={this.onAddCabinet}>캐비넷 추가 + </button>
          <button class="m-6 p-3 border-4 border-slate-500 rounded-md text-white text-2xl bg-green-900" onClick={this.onLocalSave}>저장 </button>
        </div>
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

/*
[{"name":"테스트테스트",
  "houseList":[
    {"name":"테스트-1",
       "gridLayout": [{"w":4,"h":4,"x":0,"y":7,"i":"캐비넷1","moved":false,"static":false},
                      {"w":2,"h":1,"x":4,"y":4,"i":"문열어라 문","moved":false,"static":false},
                      {"w":4,"h":4,"x":16,"y":17,"i":"캐비넷2","moved":false,"static":false},
                      {"w":2,"h":1,"x":0,"y":0,"i":"문문","moved":false,"static":false}],
       "items":      [{"type":"cabinet","i":"캐비넷1","x":0,"y":7,"w":4,"h":4,"iid":1},
                      {"type":"door","i":"문열어라 문","x":4,"y":4,"w":2,"h":1,"iid":2},
                      {"type":"cabinet","i":"캐비넷2","x":16,"y":17,"w":4,"h":4,"iid":3},
                      {"type":"door","i":"문문","x":0,"y":0,"w":2,"h":1,"iid":4}],
       "cabinet" :   [{"iid":2, "content": [[0]]},
                      {"iid":3, "content": [[0]]}],
       "iidCnt" : x,
    },
    {"name":"테스트-2",
        "gridLayout":[{"w":2,"h":1,"x":0,"y":0,"i":"door0","moved":false,"static":false},
                      {"w":4,"h":4,"x":16,"y":10,"i":"Cabinet0","moved":false,"static":false},
                      {"w":2,"h":1,"x":8,"y":2,"i":"door1","moved":false,"static":false},
                      {"w":4,"h":4,"x":3,"y":5,"i":"이제 다음으로 할 일","moved":false,"static":false},
                      {"w":2,"h":1,"x":4,"y":0,"i":"door2","moved":false,"static":false},
                      {"w":4,"h":4,"x":3,"y":13,"i":"Cabinet2","moved":false,"static":false},
                      {"w":2,"h":1,"x":0,"y":10,"i":"door3","moved":false,"static":false},
                      {"w":4,"h":4,"x":11,"y":2,"i":"오류변경이상여부확인","moved":false,"static":false}],
         "items":    [{"type":"door","i":"door0","x":0,"y":0,"w":2,"h":1,"iid":1},
                      {"type":"cabinet","i":"Cabinet0","x":16,"y":10,"w":4,"h":4,"iid":2},
                      {"type":"door","i":"door1","x":8,"y":2,"w":2,"h":1,"iid":3},
                      {"type":"cabinet","i":"이제 다음으로 할 일","x":3,"y":5,"w":4,"h":4,"iid":4},
                      {"type":"door","i":"door2","x":4,"y":0,"w":2,"h":1,"iid":5},
                      {"type":"cabinet","i":"Cabinet2","x":3,"y":13,"w":4,"h":4,"iid":6},
                      {"type":"door","i":"door3","x":0,"y":10,"w":2,"h":1,"iid":7},
                      {"type":"cabinet","i":"오류변경이상여부확인","x":11,"y":2,"w":4,"h":4,"iid":8}],
       "box" :       [{"iid":2, "content": [[0]]},
                      {"iid":3, "content": [[0]]}],
    }]
  }],
*/