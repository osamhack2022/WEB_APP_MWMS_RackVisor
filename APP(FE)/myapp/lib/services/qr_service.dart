import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:myapp/model/front_model.dart';

import '../model/stock_model.dart';

class QrService {
  FrontModel frontModel = Get.put(FrontModel());

  var data = [];
  List<StockModel> results = [];

  Future<List<StockModel>> getQrList({String? query}) async {
    String urlList = 'https://rackvisor.duckdns.org/api/stocks/stocks-in-warehouse/${frontModel.selectId}';
    var url = Uri.parse(urlList);
    try {
      var response = await http.get(url);
      if (response.statusCode == 201) {
        data = json.decode(response.body);
        results = data.map((e) => StockModel.fromJson(e)).toList();
        
        if (query!= null){
          results = results.where((element) => element.barcode!.toLowerCase().contains((query.toLowerCase()))).toList();
        }
      } else {
        print("fetch error");
      }
    } on Exception catch (e) {
      print('error: $e');
    }
    return results;
  }
}