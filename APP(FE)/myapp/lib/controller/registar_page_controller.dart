import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class RegistarPageController extends GetxController {
  final GlobalKey<FormState> loginFormKey = GlobalKey<FormState>();

  late TextEditingController emailController,
      passwordController,
      passwordController2;

  //화원가입 변수
  var email = '';
  var password = '';
  var password2 = '';

  @override
  void onInit() {
    super.onInit();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    passwordController2 = TextEditingController();
  }

  @override
  void onClose() {
    emailController.dispose();
    passwordController.dispose();
    passwordController2.dispose();
  }

  String? validateEmail(String value) {
    if (!GetUtils.isEmail(value)) {
      return "이메일을 확인하세요";
    }
    return null;
  }

  String? validatePassword(password) {
    if (password.length <= 6) {
      return "패스워드는 6글자이상이어야 합니다.";
    }
    return null;
  }


  checkValidatePassword() {
    //비밀번호 없을시 아무것도 X
    if (password == null) {
      return;
      //비밀번호 불일치시
    } else if (password2 != password) {
      return "비밀번호가 틀립니다.";
    }
    //비밀번호 일치시
    return "비밀번호가 일치합니다.";
  }


   void checkLogin() {
    final isValid = loginFormKey.currentState!.validate();

    if (!isValid) {
      return;
    }

    loginFormKey.currentState!.save();
  }
}
