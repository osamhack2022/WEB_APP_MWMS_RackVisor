import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/bottom_nav_controller.dart';
import 'package:myapp/model/login_model.dart';

import 'package:myapp/view/Fourth_page.dart';
import 'package:stylish_bottom_bar/stylish_bottom_bar.dart';

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
  LoginModel loginModel = Get.put(LoginModel());

  @override
  void initState() {
    super.initState();
  
  }

  @override
  void dispose() {
    c.dispose();
    super.dispose();
  }

  //login model에 데이터 저장.
  var value = Get.arguments;

  //부대이름 업데이트
  updateName() {
    loginModel.unitNameUpdate(value.title.toString());
  }

  //이미지 업데이트
  updateImage() {
    loginModel.unitPhotosUpdate(value.thumbnailUrl.toString());
  }
  

  @override
  Widget build(BuildContext context) {


    updateName();
    updateImage();


    return Scaffold(
      extendBody: true, 
      appBar:  AppBar(
          title: Text(loginModel.unitName),
        ),
      bottomNavigationBar: StylishBottomBar(
        items: [
          AnimatedBarItems(
              icon: const Icon(
                Icons.house_outlined,
              ),
              selectedIcon: const Icon(Icons.house_rounded),
              selectedColor: Colors.teal,
              backgroundColor: Colors.tealAccent,
              title: const Text('Home')),
          AnimatedBarItems(
              icon: const Icon(Icons.star_border_rounded),
              selectedIcon: const Icon(Icons.star_rounded),
              selectedColor: Colors.green,
              backgroundColor: Colors.lightGreenAccent,
              title: const Text('Star')),
          AnimatedBarItems(
              icon: const Icon(
                Icons.style_outlined,
              ),
              selectedIcon: const Icon(Icons.style),
              backgroundColor: Colors.amber,
              selectedColor: Colors.deepOrangeAccent,
              title: const Text('Style')),
          AnimatedBarItems(
              icon: const Icon(
                Icons.person_outline,
              ),
              selectedIcon: const Icon(
                Icons.person,
              ),
              backgroundColor: Colors.purpleAccent,
              selectedColor: Colors.deepPurple,
              title: const Text('Profile')),
        ],
        iconSize: 32,
        iconStyle: IconStyle.animated,
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
          Center(child: Text('Star')),
          Center(child: Text('Add')),
          FourthPage()
        ],
      )
      ),
    );
  }
  
}
