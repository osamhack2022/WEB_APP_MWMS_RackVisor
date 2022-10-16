import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
//https://kkhcode.tistory.com/12

const ReactExcelDownload = () => {
	const data = [
    {
      id: 1,
      title: '집에 가고싶어요',
      content: '너무 졸려 가고싶어요.'
    }, {
      id: 2,
      title: '오늘은 뭐하지',
      content: '퇴근 하고 뭐할까??'
    }, {
      id: 3,
      title: '저녁은 어떤거로?',
      content: '저녁은 치킨인가 피자인가 고민이다.'
    }
  ]

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = '작성자';

  const excelDownload = (excelData) => {
    const ws = XLSX.utils.aoa_to_sheet([
      [`작성자_kkhcode`],
      [],
      ['제목', '내용']
    ]);
    excelData.map((data) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            data.title,
            data.content
          ]
        ],
        {origin: -1}
      );
      ws['!cols'] = [
        { wpx: 200 },
        { wpx: 200 }
      ]
      return false;
    });
    const wb = {Sheets: { data: ws }, SheetNames: ['data']};
    const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array'});
    const excelFile = new Blob([excelButter], { type: excelFileType});
    FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
  }

	return (
    	<div>
        	<button onClick={() => excelDownload(data)}>엑셀 다운로드</button>
        </div>
    );
};