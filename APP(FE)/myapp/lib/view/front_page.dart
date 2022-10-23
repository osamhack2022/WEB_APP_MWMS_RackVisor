import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/bottom_nav_controller.dart';
import 'package:myapp/model/front_model.dart';
import 'package:myapp/utils/global_colors.dart';
import 'package:myapp/view/Fourth_page.dart';
import 'package:myapp/view/third_page.dart';
import 'package:myapp/view/twice_page.dart';
import 'package:stylish_bottom_bar/stylish_bottom_bar.dart';
import '../model/notice_screen_model.dart';
import '../model/warehouse_model.dart';
import '../services/Image_service.dart';
import 'First_page.dart';


class FrontPage extends StatefulWidget {
  const FrontPage({
    Key? key,
  }) : super(key: key);

  @override
  State<FrontPage> createState() => _FrontPage();
}

class _FrontPage extends State<FrontPage> {
  BottomNavigationBarController c = Get.put(BottomNavigationBarController());
  FrontModel frontModel = Get.put(FrontModel());

  @override
  void initState() {
    super.initState();
    //notice_screen_model = noticeScreenService();
  }

  @override
  void dispose() {
    c.dispose();
    super.dispose();
  }
  

  @override
  didChangeDependencies() {
    var value = Get.arguments;
    super.didChangeDependencies();
    //부대이름 업데이트
    updateName() {
    frontModel.unitNameUpdate(value.name.toString());
    } 

    //부대 아이디 업데이트
    unitNoticeUpdate() {
      frontModel.unitSelectIdUpdate(value.id);
    }
    updateName();
    unitNoticeUpdate();
  }

 



  

  @override
  Widget build(BuildContext context) {
 
    
    
    
    //updateImage();


    return Scaffold(
      extendBody: true, 
      appBar:  AppBar(
        backgroundColor: GlobalColors.backgroundColor,
          title: Text(frontModel.unitName),
        ),
      bottomNavigationBar: StylishBottomBar(
        items: [
          AnimatedBarItems(
              icon: const Icon(CupertinoIcons.home),
              selectedIcon: const Icon(CupertinoIcons.home),
              selectedColor: GlobalColors.backgroundColor,
              title: const Text('홈')),
          AnimatedBarItems(
              icon: const Icon(CupertinoIcons.qrcode_viewfinder),
              selectedIcon: const Icon(CupertinoIcons.qrcode_viewfinder),
              selectedColor: GlobalColors.backgroundColor,
              title: const Text('스캐너')),
          AnimatedBarItems(
              icon: const Icon(
                CupertinoIcons.rectangle_stack,
              ),
              selectedIcon: const Icon(CupertinoIcons.rectangle_stack),
              selectedColor: GlobalColors.backgroundColor,
              title: const Text('창고관리')),
          AnimatedBarItems(
              icon: const Icon(CupertinoIcons.person),
              selectedIcon: const Icon(CupertinoIcons.person),
              selectedColor: GlobalColors.backgroundColor,
              title: const Text('프로필')),
        ],
        iconSize: 30,
        iconStyle: IconStyle.Default,
        hasNotch: true,
        opacity: 0.3,
        currentIndex: c.selected ?? 0,
        onTap: (index) {
          c.controller.jumpToPage(index!);
          setState(() {
            c.selected = index;
          });
        },
      ),
      body: (
        PageView(
        controller: c.controller,
        children: [
          FirstPage(),
          TwicePage(eventKeyword: '실험'),
          ThirdPage(),
          FourthPage()
        ],
      )
      ),
      backgroundColor: GlobalColors.mainBackgroundColor,
    );
  }
  
}
