
import 'package:get/get.dart';

class LoginModel extends GetxController{
  String unitName = '';
  String unitPhotos = '';

  //부대 이름 업데이트
  unitNameUpdate(var index) {
    unitName = index;
    update();
  }

  //부대 이미지 업데이트
  unitPhotosUpdate(var index) {
    unitPhotos = index;
    update();
  }

}




