import React from 'react'
import AuthorHeader from '../../components/AuthorHeader'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import SearchInput from '../../utils/search/SearchInput'
import DetailSearch from '../../utils/search/DetailSearch'
import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
      className="max-h-14"
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '날짜',
          legendOffset: 36,
          legendPosition: 'middle'
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '수량',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      lineWidth={6}
      enablePoints={false}
      pointSize={9}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor', modifiers: [] }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

const data = [
  {
    "id": "japan",
    "color": "hsl(106, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 54
      },
      {
        "x": "helicopter",
        "y": 90
      },
      {
        "x": "boat",
        "y": 3
      },
      {
        "x": "train",
        "y": 70
      },
      {
        "x": "subway",
        "y": 129
      },
      {
        "x": "bus",
        "y": 165
      },
      {
        "x": "car",
        "y": 105
      },
      {
        "x": "moto",
        "y": 19
      },
      {
        "x": "bicycle",
        "y": 241
      },
      {
        "x": "horse",
        "y": 12
      },
      {
        "x": "skateboard",
        "y": 105
      },
      {
        "x": "others",
        "y": 30
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(171, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 136
      },
      {
        "x": "helicopter",
        "y": 94
      },
      {
        "x": "boat",
        "y": 45
      },
      {
        "x": "train",
        "y": 282
      },
      {
        "x": "subway",
        "y": 148
      },
      {
        "x": "bus",
        "y": 27
      },
      {
        "x": "car",
        "y": 162
      },
      {
        "x": "moto",
        "y": 33
      },
      {
        "x": "bicycle",
        "y": 262
      },
      {
        "x": "horse",
        "y": 15
      },
      {
        "x": "skateboard",
        "y": 80
      },
      {
        "x": "others",
        "y": 140
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(155, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 15
      },
      {
        "x": "helicopter",
        "y": 111
      },
      {
        "x": "boat",
        "y": 151
      },
      {
        "x": "train",
        "y": 79
      },
      {
        "x": "subway",
        "y": 31
      },
      {
        "x": "bus",
        "y": 77
      },
      {
        "x": "car",
        "y": 119
      },
      {
        "x": "moto",
        "y": 231
      },
      {
        "x": "bicycle",
        "y": 258
      },
      {
        "x": "horse",
        "y": 193
      },
      {
        "x": "skateboard",
        "y": 233
      },
      {
        "x": "others",
        "y": 104
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(99, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 40
      },
      {
        "x": "helicopter",
        "y": 158
      },
      {
        "x": "boat",
        "y": 137
      },
      {
        "x": "train",
        "y": 217
      },
      {
        "x": "subway",
        "y": 220
      },
      {
        "x": "bus",
        "y": 51
      },
      {
        "x": "car",
        "y": 117
      },
      {
        "x": "moto",
        "y": 300
      },
      {
        "x": "bicycle",
        "y": 166
      },
      {
        "x": "horse",
        "y": 287
      },
      {
        "x": "skateboard",
        "y": 72
      },
      {
        "x": "others",
        "y": 40
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(353, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 116
      },
      {
        "x": "helicopter",
        "y": 37
      },
      {
        "x": "boat",
        "y": 284
      },
      {
        "x": "train",
        "y": 250
      },
      {
        "x": "subway",
        "y": 248
      },
      {
        "x": "bus",
        "y": 75
      },
      {
        "x": "car",
        "y": 258
      },
      {
        "x": "moto",
        "y": 224
      },
      {
        "x": "bicycle",
        "y": 238
      },
      {
        "x": "horse",
        "y": 183
      },
      {
        "x": "skateboard",
        "y": 70
      },
      {
        "x": "others",
        "y": 211
      }
    ]
  }
]

function StaticsPage() {
  return (
    <>
    <AuthorHeader/>
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <div>통계 보여주기용 검색</div>
        <DetailSearch/>
        <div>통계 내용</div>
        <MyResponsiveLine data={data}/>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default StaticsPage