import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
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
    return Scaffold(
        body:
             Column(
               children: [
                 Expanded(
                  flex: 1,
                  child: QRView(key: qrKey, onQRViewCreated: _onQrViewCreated,)),
               ],
             ),
    );
  }

  void _onQrViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) {
      setState(() {
        result = scanData;
        Get.toNamed("/qrSearchResultPage", arguments: scanData);
      });
     });
  }

  @override
  void dispose() {
    controller!.dispose();
    super.dispose();
  }

}