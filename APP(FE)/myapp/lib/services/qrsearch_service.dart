import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:myapp/model/front_model.dart';

import '../model/stock_model.dart';

class QrSearchList {
  FrontModel frontModel = Get.put(FrontModel());

  var data = [];
  List<StockModel> results = [];

  Future<List<StockModel>> getSearchList(barcode) async {
    String urlList = 'https://211.37.150.202/api/stocks/advanced-search';
    var url = Uri.parse(urlList);
    try {
      var response = await http.post(url,
      headers: {"Content-Type": "application/json"},
      body: <String, dynamic> {
          'barcode' : barcode,
        }
      );
      
      if (response.statusCode == 200) {
        data = json.decode(response.body);
        results = data.map((e) => StockModel.fromJson(e)).toList();
        
        if (barcode!= null){
          results = results.where((element) => element.name!.toLowerCase().contains((barcode.toLowerCase()))).toList();
        }
      } else {
        print("error");
      }
    } on Exception catch (e) {
      print('error: $e');
    }
    return results;
  }
}