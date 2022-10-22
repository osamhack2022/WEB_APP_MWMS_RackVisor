import 'dart:convert';
import 'package:get/get.dart';
import 'package:myapp/model/login_model.dart';
import 'package:myapp/model/unit_page_model.dart';
import 'package:http/http.dart' as http;



Future logingUser(String militarySerialNumber, String password) async {
  var uri = Uri.parse('https://211.37.150.202:80/api/users/all-users');
  final response = await http.post(uri, 
  body: {'militarySerialNumber': militarySerialNumber, 'password': password});

  var converedDatatoJson = jsonDecode(response.body);
  return converedDatatoJson;
}
