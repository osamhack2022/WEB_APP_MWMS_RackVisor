
import 'package:get/get.dart';

class FrontModel extends GetxController{
  String unitName = '';
  String unitPhotos = '';
  int selectId = 0;


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
  
  //부대 선택번호 업데이트
  unitSelectIdUpdate(var index) {
    selectId = index;
    update();
  }
  


}




