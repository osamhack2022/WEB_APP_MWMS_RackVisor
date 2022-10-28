import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

class QRCheckScreen extends StatefulWidget {
  static const String ROUTE_NAME = '/qr_check_screen';

  final String eventKeyword; //건져올 키특정 키워드

  QRCheckScreen({required this.eventKeyword});

  @override
  State<QRCheckScreen> createState() => _QRCheckScreenState();
}

class _QRCheckScreenState extends State<QRCheckScreen> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    return Scaffold(
        appBar: AppBar(title: Text('QR스캐너'),),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(
              child: Container(
                child: QRView(
                  key: qrKey,

                  onQRViewCreated: this._onQRViewCreated,
                  formatsAllowed: [
                    BarcodeFormat.qrcode
                  ],
                  overlay: QrScannerOverlayShape(
                    borderRadius: 10,
                    borderLength: 30,
                    borderWidth: 5,
                    cutOutSize: screenSize.width/1.4,
                  ),
                ),
              ),
            )
          ],
        ));
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((event) {

      //스캔된 QR코드에 특정 키워드가 들어있다면
      //QR스캔을 정지하고 이 화면을 닫으면서 QR결과값을 보내주도록한다.
      if (event.code != null) {

          this.controller!.dispose();
          Navigator.pop(context, event.code);
      }
    });
  }
}