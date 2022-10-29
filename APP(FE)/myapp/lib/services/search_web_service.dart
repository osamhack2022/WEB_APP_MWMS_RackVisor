/*import 'dart:convert';
import 'package:myapp/model/unit_page_model.dart';
import 'package:http/http.dart' as http;

class WebService {
  static Future<List<Album>> getPhotos() async {
    var uri = Uri.parse('https://jsonplaceholder.typicode.com/photos');

    try {
      final response = await http
          .get(uri);

      if (response.statusCode == 200) {
        List<Album> list = parsePhotos(response.body);
        return list;
      } else {
        throw Exception("Error");
      }
    } catch (e) {
      throw Exception(e.toString());
    }
  }

  static List<Album> parsePhotos(String responsebody) {
    final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
    return parsed.map<Album>((json) => Album.fromJson(json)).toList();
  }
}*/
