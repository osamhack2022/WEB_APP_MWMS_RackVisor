// import 'dart:convert';
// import 'package:get/get.dart';
// import 'package:http/http.dart' as http;
// import '../model/front_model.dart';
// import '../model/notice_screen_model.dart';

// class FrontService{
//   static FrontModel frontModel = Get.put(FrontModel());
  
//   static Future<List<NoticeScreenModel>> noticeScreenService() async {
//       var uri = await Uri.parse("https://211.37.150.202:80/api/posts/unit-posts/${frontModel.selectId}");

//         final response = await http.get(
//         (uri), 
//         headers: {"Content-Type": "application/json"},);

//         List<NoticeScreenModel> list = parseNotice(response.body);

//         return list;
//   }
//       static List<NoticeScreenModel> parseNotice(String responsebody) {
//       final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
//       return parsed.map<NoticeScreenModel>((json) => NoticeScreenModel.fromJson(json)).toList();
//   }
// }