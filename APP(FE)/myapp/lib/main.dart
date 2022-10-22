import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:myapp/utils/constants.dart';
import 'package:myapp/view/front_page.dart';
import 'package:myapp/view/login_page.dart';
import 'package:myapp/view/notice_page.dart';
import 'package:myapp/view/serachResult_page.dart';
import 'package:myapp/view/unit_page.dart';

import 'stroage/**strorage_main_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    //회전방지
    WidgetsFlutterBinding.ensureInitialized();
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: kDarkTheme,
      home: UnitPage(),
      initialRoute: "/",
      getPages: [
        GetPage(name: "/loginPage", page: () => LoginPage()),
        GetPage(name: "/frontPage", page: () => const FrontPage()),
        GetPage(name: "/unitPage", page: () => UnitPage()),
        GetPage(name: "/searchPage", page: () => SearchResultPage()),
        
      ]
    );
  }
}