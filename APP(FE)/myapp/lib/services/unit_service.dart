import 'dart:convert';
import 'package:myapp/model/unit_page_model.dart';
import 'package:http/http.dart' as http;

class UnitService {
  static Future<List<UnitModel>> getPhotos() async {
    var uri = Uri.parse('https://211.37.150.202:80/api/units/all-units');

    try {
      final response = await http
          .get(uri);
          List<UnitModel> list = parsePhotos(response.body);
        return list;

      /*if (response.statusCode == 201) {
        List<UnitModel> list = parsePhotos(response.body);
        return list;
      } else {
        throw Exception("Error");
      }*/
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  static List<UnitModel> parsePhotos(String responsebody) {
    final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
    return parsed.map<UnitModel>((json) => UnitModel.fromJson(json)).toList();
  }
}
