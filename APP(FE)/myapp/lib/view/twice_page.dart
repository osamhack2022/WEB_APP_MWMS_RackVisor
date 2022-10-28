import 'package:flutter/material.dart';
import 'package:qrscan/qrscan.dart' as scanner;
import 'dart:async';


class TwicePage extends StatefulWidget {
  TwicePage({Key? key}) : super(key: key);

  @override
  State<TwicePage> createState() => _TwicePageState();
}

class _TwicePageState extends State<TwicePage> {
  String _output = 'Empty Scan Code';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.grey[300],
        body: Builder(
          builder: (BuildContext context) {
            return Center( 
              //정 가운데에 QR 스켄값 표시
              child: Text(_output, style: TextStyle(color: Colors.black)),);
          },
        ),
        //플로팅 액션 버튼으로 qr 스캔 함수 실행
        floatingActionButton: FloatingActionButton(
          onPressed: () => _scan(),
          tooltip: 'scan',
          child: const Icon(Icons.camera_alt),
        ),
      ),
    );
  }
  
  //비동기 함수     
  Future _scan() async {
    //스캔 시작 - 이때 스캔 될때까지 blocking
    String? barcode = await scanner.scan();
    //스캔 완료하면 _output 에 문자열 저장하면서 상태 변경 요청.
    setState(() => _output = barcode!);   
  }
}