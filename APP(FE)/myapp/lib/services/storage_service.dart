import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:myapp/model/front_model.dart';
import '../model/warehouse_model.dart';

class StorageService{
  FrontModel frontModel = Get.put(FrontModel());

  Future<WarehouseImage> StorageService2() async {
      var uri = Uri.parse("https://211.37.150.202:80/api/warehouses/my-warehouses/${frontModel.selectId}");

        final response = await http.get(
        (uri), 
        headers: {"Content-Type": "application/json"},);

        return WarehouseImage.fromJson(json.decode(response.body));
  }
}


