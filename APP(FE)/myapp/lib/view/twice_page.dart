import 'package:flutter/material.dart';

import '../screen/qrScreen.dart';


class TwicePage extends StatefulWidget {
  

  @override
  _TwicePageState createState() => _TwicePageState();
}

class _TwicePageState extends State<TwicePage> {
  String qrResult = '';

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                '여기에 링크가 뜨게 됩니다.',
              ),
              Text(
                qrResult,
                style: Theme.of(context).textTheme.bodyText2,
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _onPressedFAB,
          tooltip: 'Increment',
          child: Icon(Icons.add),
        ), // This trailing comma makes auto-formatting nicer for build methods.
      ),
    );
  }

  //비동기 실행으로 QR 화면이 닫히기 전까지 await 으로 기다리도록 한다.
  void _onPressedFAB() async {
    dynamic result =
        await Navigator.push(context, MaterialPageRoute(builder: (context) {
      return QRCheckScreen(eventKeyword: 'userId');
    }));

    if (result != null) {
      setState(() {
        //QR 코드스캐너에서 받은 결과값을 화면의 qrResult 에 적용하도록 한다.
        qrResult = result.toString();
      });
    }
  }
}