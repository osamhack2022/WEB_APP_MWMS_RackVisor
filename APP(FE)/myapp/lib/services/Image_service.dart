import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import '../model/front_model.dart';
import '../model/notice_screen_model.dart';
import '../model/warehouse_model.dart';

class ImageService{
FrontModel frontModel = Get.put(FrontModel());

  static Future<List<WarehouseImage>> ImageService2() async {
      var uri = Uri.parse("https://211.37.150.202:80/api/warehouses/{warehouseId}");

        final response = await http.get(
        (uri), 
        headers: {"Content-Type": "application/json"},);

        List<WarehouseImage> list = parseImage(response.body);

        return list;
  }
      static List<WarehouseImage> parseImage(String responsebody) {
      final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
      return parsed.map<WarehouseImage>((json) => WarehouseImage.fromJson(json)).toList();
  }

}