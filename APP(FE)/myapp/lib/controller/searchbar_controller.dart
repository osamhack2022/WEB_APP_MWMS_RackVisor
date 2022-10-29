import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';
import '../view/serachResult_page.dart';

class SearchBarController extends GetxController {


  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }

  searchBar() {
    return InkWell(
      onTap: () => Get.toNamed("/searchPage"),

      child: Container(
      decoration: BoxDecoration(
        
        border: Border.all(
          width: 2,
          color: Colors.white,
        ),

        color: Colors.white,
          borderRadius: BorderRadius.circular(10),
      ),


      child: Row(
        // ignore: prefer_const_literals_to_create_immutables
        children: [
          
          //아이콘
          const Expanded(
            flex: 1,
            child:  Icon(Icons.search,
            color: Colors.grey
            ),
          ),

          //검색하세요
           
            Expanded(
              flex: 4,
              child: Text("검색하세요",
              style: TextStyle(color: Colors.grey),
              ),
            ),
            

          

          Divider(thickness: 1,),

          //qr 스캐너 on
          const Expanded(
            flex: 1,
            child: Icon(CupertinoIcons.qrcode,
               ),
          ),
       


          ]
        ),
  ),

    );
  }



}

