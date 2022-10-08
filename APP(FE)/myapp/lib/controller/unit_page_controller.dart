
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';

class UnitPageController {

  UnitArticle _article;

  UnitPageController(UnitArticle unitArticle) : _article = unitArticle;

  //부대이름 가져오기
  String get unitname {
    return _article.unitname;
  }

  String get author{
    return _article.author;
  }



}

// class UnitPageListController {
//   void 
// }