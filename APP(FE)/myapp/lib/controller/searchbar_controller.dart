import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../model/searchbar_model.dart';
class SearchBarController extends GetxController {


  static List<SearchbarModel> searchList = [

  ];


  List<SearchbarModel> displayList = List.from(searchList);

  

  void updateList(String value) {
    
  }

  SearchBar() {
    return TextField(
      style: const TextStyle(color: Colors.white),
    decoration: InputDecoration(
      filled: true,
      fillColor: Colors.blueGrey,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.0),
        borderSide: BorderSide.none,
        ),
        hintText: "검색하세요",
        prefixIcon: const Icon(Icons.search),
        prefixIconColor: const Color.fromARGB(255, 255, 255, 255)
    )
  );




  }
}