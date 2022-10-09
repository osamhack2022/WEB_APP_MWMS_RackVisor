
import 'package:flutter/cupertino.dart';
import 'package:myapp/model/unit_page_model.dart';
import 'package:myapp/services/web_service.dart';
import 'package:flutter/material.dart';

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

  String get url{
    return _article.url;
  }

  String get imageUrl {
    return _article.urlToImage;
  }


}

enum LoadingStatus {
  completed,
  searching,
  empty
}

 class UnitPageListController with ChangeNotifier {
  LoadingStatus loadingStatus = LoadingStatus.empty;
  List<UnitPageController> unitPageController = <UnitPageController>[];

  UnitPageListController(BuildContext context);


   void topHeadlines() async {
    List<UnitArticle> unitArticles = await WebService().fetchTopheadLines();
    loadingStatus = LoadingStatus.searching;
    notifyListeners();

    unitPageController = unitArticles.map((unitArticle) => UnitPageController(unitArticle)).toList();
   
   if(unitPageController.isEmpty) {
      loadingStatus = LoadingStatus.empty;
   } else {
      loadingStatus = LoadingStatus.completed;
   }
   notifyListeners();
   }
 }