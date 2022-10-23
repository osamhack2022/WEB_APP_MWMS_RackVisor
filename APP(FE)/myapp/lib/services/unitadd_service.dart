
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../model/unit_add_page_model.dart';


class UnitService {
  static Future<List<UnitaddModel>> unitPageAdd(String name,String comment) async {
    var uri = Uri.parse('https://211.37.150.202:80/api/units/');
    
    try {
      final response = await http.post(
        (uri), headers: {"Content-Type": "application/json"},
        body: <String, String> {
          'name' : name,
          'comment' :comment,
        }
      );
      
          List<UnitaddModel> list = pageadd(response.body);
        return list;

    } catch (e) {
      throw Exception(e.toString());
    }
  }
  
  static List<UnitaddModel> pageadd(String responsebody) {
    final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
    return parsed.map<UnitaddModel>((json) => UnitaddModel.fromJson(json)).toList();
  }
}
