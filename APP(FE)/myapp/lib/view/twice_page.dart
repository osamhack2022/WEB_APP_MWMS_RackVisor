import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'dart:io';


class TwicePage extends StatefulWidget {
  TwicePage({Key? key}) : super(key: key);


  @override
  State<TwicePage> createState() => _TwicePageState();
}

class _TwicePageState extends State<TwicePage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  Barcode? result;
  QRViewController? controller;

  @override 
  void ressemble() {
    super.reassemble();
    if(Platform.isAndroid) {
      controller!.pauseCamera();
    } else if(Platform.isIOS) {
      controller!.resumeCamera();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
          
          Container(
            width: 300,
            height: 400,
            child: QRView(key: qrKey, onQRViewCreated: _onQrViewCreated,)
          ),


          Container(
            width: 150,
            height: 100,
            child: Center(
              child: (result != null ? Text("바코는 : ${describeEnum(result!.format)} Data: ${result!.code}") : Text("Scan a barcode")),
            ))


        ],)

      ),
    );
  }

  void _onQrViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        result = scanData;
        Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => WebView(initUrl: scanData.homeLink))
  );
      });

      
     });
  }

  @override
  void dispose() {
    controller!.dispose();
    super.dispose();
  }

}