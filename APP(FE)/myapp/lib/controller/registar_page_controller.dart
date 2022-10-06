import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class RegistarPageController extends GetxController {
  final GlobalKey<FormState> loginFormKey = GlobalKey<FormState>();

  late TextEditingController emailController,
      passwordController,
      passwordController2;

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

  String? validatePassword(passwordvalue) {
    if (passwordvalue.length <= 6) {
      return "패스워드는 6글자이상이어야 합니다.";
    }
    return null;
  }

  String? checkvalidatePassword(value) {
    if (passwordController2.text != passwordController.text) {
      return "불일치";
    }
    return null;
  }

   void checkLogin() {
    final isValid = loginFormKey.currentState!.validate();

    if (!isValid) {
      return;
    }

    loginFormKey.currentState!.save();
  }
}
