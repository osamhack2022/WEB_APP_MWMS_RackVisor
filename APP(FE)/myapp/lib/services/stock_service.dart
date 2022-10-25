import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:myapp/model/front_model.dart';

import '../model/stock_model.dart';

class FetchUserList {
  FrontModel frontModel = Get.put(FrontModel());

  var data = [];
  List<StockModel> results = [];

  Future<List<StockModel>> getuserList({String? query}) async {
    String urlList = 'https://211.37.150.202/api/stocks/stocks-in-warehouse/${frontModel.selectId}';
    var url = Uri.parse(urlList);
    try {
      var response = await http.get(url);
      if (response.statusCode == 201) {
        data = json.decode(response.body);
        results = data.map((e) => StockModel.fromJson(e)).toList();
        
        if (query!= null){
          results = results.where((element) => element.name!.toLowerCase().contains((query.toLowerCase()))).toList();
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