import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
 
class LoginPageController extends GetxController {
  final GlobalKey<FormState> loginFormKey = GlobalKey<FormState>();

  late TextEditingController loginEmailController,
      loginPasswordController;

  var email = '';
  var password = '';

  @override
  void onInit() {
    super.onInit();
    loginEmailController = TextEditingController();
    loginPasswordController = TextEditingController();
  }

  @override
  void onClose() {
    loginEmailController.dispose();
    loginPasswordController.dispose();
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

  void checkLogin() {
    final isValid = loginFormKey.currentState!.validate();

    if (!isValid) {
      return;
    }

    loginFormKey.currentState!.save();
  }
}
