
import 'package:dio/dio.dart';
import 'package:myapp/model/unit_page_model.dart';

class WebService {
  var dio = new Dio();

  Future<List<UnitArticle>> TopheadLines() async {
    String url = "https://newsapi.org/v2/everything?q=keyword&apiKey=7a75dfe4d5f742f59ae554e2cb051df0";

    final response = await dio.get(url);

    if(response.statusCode == 200) {
      final result = response.data;
      Iterable list = result['articles'];
      return list.map((article) => UnitArticle.fromJson(article)).toList();
    } else {
      throw Exception("failed to get information");
    }

  }
}