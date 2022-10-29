import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../model/stock_model.dart';
import '../screen/search.dart';
import '../services/qr_service.dart';
import '../services/stock_service.dart';

class QrSearchResultPage extends StatefulWidget {
  @override
  _QrSearchResultPageState createState() => _QrSearchResultPageState();
}

class _QrSearchResultPageState extends State<QrSearchResultPage> {
  QrService _qrService = QrService();
  

  var barcode = Get.arguments;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          //백버튼 막기
          automaticallyImplyLeading: false,
          title: Text('검색결과'),
          actions: [
            IconButton(
              onPressed: () {
                showSearch(context: context, delegate: SearchUser());
              },
              icon: Icon(Icons.search_sharp),
            )
          ],
        ),
        body: Container(
          padding: EdgeInsets.all(20),
          child: FutureBuilder<List<StockModel>>(
              future: _qrService.getQrList(query: barcode),
              builder: (context, snapshot) {
                var data = snapshot.data;
                
                return ListView.builder(
                    itemCount: data?.length,
                    itemBuilder: (context, index) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      }
                      return Card(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ListTile(
                            title: Row(
                              children: [
                                Container(
                                  width: 60,
                                  height: 60,
                                  decoration: BoxDecoration(
                                    color: Colors.deepPurpleAccent,
                                    borderRadius: BorderRadius.circular(10),
                                  ),
                                  child: Center(
                                    child: Text(
                                      '${data?[index].id}',
                                      style: TextStyle(
                                          fontSize: 20,
                                          fontWeight: FontWeight.bold,
                                          color: Colors.white),
                                    ),
                                  ),
                                ),
                                SizedBox(width: 20),
                                Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '${data?[index].name}',
                                        style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.w600),
                                      ),
                                      SizedBox(height: 10),
                                      Text(
                                        '${data?[index].comment}',
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontSize: 14,
                                          fontWeight: FontWeight.w400,
                                        ),
                                      ),
                                    ])
                              ],
                            ),
                            
                          ),
                        ),
                      );
                    });
              }),
        ),
      ),
    );
  }
}