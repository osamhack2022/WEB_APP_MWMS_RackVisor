import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/login_page_controller.dart';
import 'package:myapp/controller/registar_page_controller.dart';
import 'package:myapp/utils/global_colors.dart';

//import 'package:myapp/controller/login_page_controller.dart';
//import 'package:myapp/controller/registar_page_controller.dart';
//import 'package:myapp/utils/global_colors.dart';

class LoginPage extends StatelessWidget {
  LoginPage({key}) : super(key: key);

  LoginPageController loginPageController = Get.put(LoginPageController());

  @override
  Widget build(BuildContext context) {
    Get.put(LoginPageController());

    return Scaffold(

      backgroundColor: GlobalColors.mainColor,

      body: SafeArea(
        child: Form(
          key: loginPageController.loginFormKey,
          child: SingleChildScrollView(
            child: Column(children: [

              SizedBox(
                width: MediaQuery.of(context).size.width * 0.8,
                height: 195,
                child: Image.asset(
                  'images/main_logo.png',
                  fit: BoxFit.scaleDown,
                ),
              ),

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
                "물자관리를 빠르고 편리하게 \n누구든 간단하게",
                style: TextStyle(
                  fontSize: 24,
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
                  child: Padding(
                    // 입력값 왼쪽 띄우기
                    padding: const EdgeInsets.only(left: 20.0),

                    child: TextFormField(
                      controller: loginPageController.loginEmailController,

                      onSaved: (value) {
                        loginPageController.email = value!;
                      },

                      validator: (value) {
                        return loginPageController.validateEmail(value!);
                      },
                      decoration: const InputDecoration(
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
                  child: Padding(
                    // 입력값 왼쪽 띄우기
                    padding: const EdgeInsets.only(left: 20.0),
                    child: TextFormField(
                      controller: loginPageController.loginPasswordController,
                      onSaved: (value) {
                        loginPageController.password = value!;
                      },

                      validator: (value) {
                        return loginPageController.validatePassword(value!);
                      },

                      // 비밀번호 숨기기
                      obscureText: true,
                      decoration: const InputDecoration(
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
                child: InkWell(
                  onTap: () => loginPageController.checkLogin(),
                  child: Container(
                    height: 50,
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
        ),
      ),
    );
  }
}
