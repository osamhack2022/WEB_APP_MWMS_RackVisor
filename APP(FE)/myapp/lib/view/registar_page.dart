import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/registar_page_controller.dart';
import 'package:myapp/utils/global_colors.dart';

class RegistarPage extends StatelessWidget {
  RegistarPage({key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    RegistarPageController registarPageController =
        Get.put(RegistarPageController());

    return Scaffold(
      backgroundColor: GlobalColors.mainColor,
      body: SafeArea(
        child: Form(
          key: registarPageController.loginFormKey,
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Image.asset("img/logo_main.png"),

            // 국방물자관리체계
            const Text(
              '국방물자관리체계',
              style: TextStyle(
                fontWeight: FontWeight.bold,
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
                child: TextFormField(
                  controller: registarPageController.emailController,
                  onSaved: (value) {
                    registarPageController.email = value!;
                  },
                  validator: (value) {
                    return registarPageController.validateEmail(value!);
                  },
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    labelText: '이메일을 입력하세요',
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
                child: TextFormField(
                  controller: registarPageController.passwordController,

                  onSaved: (value) {
                    registarPageController.password = value!;
                  },

                  //6글자 판별기
                  validator: (value) {
                    return registarPageController.validatePassword(value!);
                  },

                  // 비밀번호 숨기기
                  obscureText: true,
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    labelText: '비밀번호를 입력하세요',
                  ),
                ),
              ),
            ),

            const SizedBox(height: 10),

            // 비밀번호 확인 필드
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25.0),
              child: Container(
                decoration: BoxDecoration(
                  color: GlobalColors.loginBorder,
                  border: Border.all(color: Colors.white),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: TextFormField(
                  controller: registarPageController.passwordController2,

                  onSaved: (value) {
                    registarPageController.password2 = value!;
                  },

                  validator: (value) {
                    registarPageController.checkvalidatePassword(value);
                  },

                  // 비밀번호 숨기기
                  obscureText: true,
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    labelText: '비밀번호를 다시 입력하세요',
                  ),
                ),
              ),
            ),

            const SizedBox(height: 10),

            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 25.0),
              child: InkWell(
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.deepPurple,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Center(
                    child: Text(
                      '회원 가입하기',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                  ),
                ),
                onTap: () => Get.find<RegistarPageController>().checkLogin(),
              ),
            ),

            const SizedBox(height: 25),
          ]),
        ),
      ),
    );
  }
}
