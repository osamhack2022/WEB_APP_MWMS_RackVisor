import React from 'react'
import AuthorHeader from '../../components/AuthorHeader'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import DetailSearch from '../../utils/search/DetailSearch'
import Graph from '../../components/Graph'

function StaticsPage() {
  const data = [
    {
      "id": "japan",
      "color": "hsl(128, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 179
        },
        {
          "x": "helicopter",
          "y": 8
        },
        {
          "x": "boat",
          "y": 133
        },
        {
          "x": "train",
          "y": 74
        },
        {
          "x": "subway",
          "y": 94
        },
        {
          "x": "bus",
          "y": 81
        },
        {
          "x": "car",
          "y": 10
        },
        {
          "x": "moto",
          "y": 234
        },
        {
          "x": "bicycle",
          "y": 211
        },
        {
          "x": "horse",
          "y": 63
        },
        {
          "x": "skateboard",
          "y": 273
        },
        {
          "x": "others",
          "y": 66
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(49, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 19
        },
        {
          "x": "helicopter",
          "y": 55
        },
        {
          "x": "boat",
          "y": 267
        },
        {
          "x": "train",
          "y": 199
        },
        {
          "x": "subway",
          "y": 31
        },
        {
          "x": "bus",
          "y": 135
        },
        {
          "x": "car",
          "y": 62
        },
        {
          "x": "moto",
          "y": 273
        },
        {
          "x": "bicycle",
          "y": 7
        },
        {
          "x": "horse",
          "y": 150
        },
        {
          "x": "skateboard",
          "y": 232
        },
        {
          "x": "others",
          "y": 284
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(168, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 185
        },
        {
          "x": "helicopter",
          "y": 226
        },
        {
          "x": "boat",
          "y": 157
        },
        {
          "x": "train",
          "y": 191
        },
        {
          "x": "subway",
          "y": 47
        },
        {
          "x": "bus",
          "y": 58
        },
        {
          "x": "car",
          "y": 158
        },
        {
          "x": "moto",
          "y": 17
        },
        {
          "x": "bicycle",
          "y": 188
        },
        {
          "x": "horse",
          "y": 267
        },
        {
          "x": "skateboard",
          "y": 250
        },
        {
          "x": "others",
          "y": 3
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(85, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 178
        },
        {
          "x": "helicopter",
          "y": 14
        },
        {
          "x": "boat",
          "y": 171
        },
        {
          "x": "train",
          "y": 161
        },
        {
          "x": "subway",
          "y": 28
        },
        {
          "x": "bus",
          "y": 216
        },
        {
          "x": "car",
          "y": 119
        },
        {
          "x": "moto",
          "y": 202
        },
        {
          "x": "bicycle",
          "y": 63
        },
        {
          "x": "horse",
          "y": 269
        },
        {
          "x": "skateboard",
          "y": 32
        },
        {
          "x": "others",
          "y": 283
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(311, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 264
        },
        {
          "x": "helicopter",
          "y": 45
        },
        {
          "x": "boat",
          "y": 59
        },
        {
          "x": "train",
          "y": 37
        },
        {
          "x": "subway",
          "y": 169
        },
        {
          "x": "bus",
          "y": 266
        },
        {
          "x": "car",
          "y": 186
        },
        {
          "x": "moto",
          "y": 164
        },
        {
          "x": "bicycle",
          "y": 79
        },
        {
          "x": "horse",
          "y": 173
        },
        {
          "x": "skateboard",
          "y": 158
        },
        {
          "x": "others",
          "y": 298
        }
      ]
    }
  ];
  
  return (
    <>
    <AuthorHeader/>
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <div>통계 보여주기용 검색</div>
        <DetailSearch/>
        <div>통계 내용</div>
        <div style={{ display: "grid", height: 400 }}>
          <div>
            <Graph data={data}/>
          </div>
        </div> 
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default StaticsPage