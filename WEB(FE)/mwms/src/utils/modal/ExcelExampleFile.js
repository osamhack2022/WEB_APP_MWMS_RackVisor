import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function ExcelExampleFile () {
	const data = [
    {
      id: 1,
      name: '휴지',
      type: '2종',
      detail: '기타물자류',
      cnt: 100,
      status: '좋음',
      due: '2022/10/27' ,
      des: ''
    },{
      id: 2,
      name: '쌀',
      type: '1종',
      detail: '주식',
      cnt: 1000,
      status: '나쁨',
      due: '2022/11/27' ,
      des: ''
    }, {
      id: 3,
      name: '',
      type: '',
      detail: '',
      cnt: '',
      status: '',
      due: '',
      des: '물자 종류와 세부분류는 국방물자훈령을 참고할 것'
    }
  ]

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = '예제';

  const excelDownload = (excelData) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [`이름`, `종류`, `세부분류`, `수량`, `상태`, `기한`],
    ]);
    excelData.map((data) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            data.name,
            data.type,
            data.detail,
            data.cnt,
            data.status,
            data.due,
            data.des
          ]
        ],
        {origin: -1}
      );
      ws['!cols'] = [
        { wpx: 70 },
        { wpx: 70 },
        { wpx: 100 },
        { wpx: 70 },
        { wpx: 70 },
        { wpx: 100 },
        { wpx: 200 },
      ]
      return false;
    });
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  }

	return (
    	<>
        <button 
          type="button"
          className="w-full mt-3 mr-4 inline-flex justify-center bg-[#7A5EA6] rounded-md shadow-smmy-2 mb-2 mx-1 h-[22px] font-medium text-white hover:text-white text-[14px] w-[100px]"
          onClick={() => excelDownload(data)}>예시 다운로드</button>
      </>
    );
};