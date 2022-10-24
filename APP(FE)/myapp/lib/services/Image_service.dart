import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import '../model/front_model.dart';
import '../model/warehouse_model.dart';

class ImageService{
static FrontModel frontModel = Get.put(FrontModel());

   static Future<WarehouseImage> ImageService2() async {
      var uri = Uri.parse("https://211.37.150.202:80/api/warehouses/");

        final response = await http.get(
        (uri), 
        headers: {"Content-Type": "application/json"},);

        return WarehouseImage.fromJson(json.decode(response.body));
  }
}


