import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/login_page_controller.dart';
import 'package:myapp/controller/registar_page_controller.dart';

import 'package:myapp/utils/global_colors.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Get.put(LoginPageController());

    return Scaffold(
      backgroundColor: GlobalColors.mainColor,
      body: Center(
        child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Image.asset("img/main_logo.png"),

          // 국방물자관리체계
          const Text(
            '국방물자관리체계',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 24,
            ),
          ),

          const SizedBox(height: 10),

          // 환영합니다.
          const Text(
            "환영합니다.",
            style: TextStyle(
              fontSize: 240,
            ),
          ),

          const SizedBox(height: 40),

          // 이메일 입력필드
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25.0),
            child: Container(
              decoration: BoxDecoration(
                color: GlobalColors.loginBorder,
                border: Border.all(color: Colors.white),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Padding(
                // 입력값 왼쪽 띄우기
                padding: EdgeInsets.only(left: 20.0),
                child: TextField(
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: '이메일을 입력하세요',
                  ),
                ),
              ),
            ),
          ),

          const SizedBox(height: 10),

          // 비밀번호 입력필드
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25.0),
            child: Container(
              decoration: BoxDecoration(
                color: GlobalColors.loginBorder,
                border: Border.all(color: Colors.white),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Padding(
                // 입력값 왼쪽 띄우기
                padding: EdgeInsets.only(left: 20.0),
                child: TextField(
                  // 비밀번호 숨기기
                  obscureText: true,
                  decoration: InputDecoration(
                    border: InputBorder.none,
                    hintText: '비밀번호를 입력하세요',
                  ),
                ),
              ),
            ),
          ),

          const SizedBox(height: 10),

          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 25.0),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.deepPurple,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Center(
                child: Text(
                  'sign in',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
              ),
            ),
          ),

          const SizedBox(height: 25),

          // 회원가입 부분
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                '회원이 아니신가요?',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              InkWell(
                onTap: () {
                  Get.put(RegistarPageController());
                  Get.toNamed("/registarPage");
          
                },
                child: const Text(
                  ' 가입하기',
                  style: TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ]),
      ),
    );
  }
}
