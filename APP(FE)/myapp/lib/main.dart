import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/unit_page_controller.dart';
import 'package:myapp/view/front_page.dart';
import 'package:myapp/view/login_page.dart';
import 'package:myapp/view/registar_page.dart';
import 'package:myapp/view/unit_page.dart';
//import 'package:myapp/view/front_page.dart';
//import 'package:myapp/view/login_page.dart';
//import 'package:myapp/view/registar_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: UnitPage(),
      initialRoute: "/",
      getPages: [
        GetPage(name: "/loginPage", page: () => LoginPage()),
        GetPage(name: "/registarPage", page: () => RegistarPage()),
        GetPage(name: "/frontPage", page: () => const FrontPage()),
        GetPage(name: "/unitPage", page: () => UnitPage()),
        
      ]
    );
  }
}