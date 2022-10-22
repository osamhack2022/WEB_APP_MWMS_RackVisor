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

  searchResultList(UnitModel unitModel) {
    return Card(
      elevation: 5.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
        ),
        child: Container(
          width: 200,
          height: 100,
          child: Center(
            child: Text(unitModel.name),
          ),
        ),
    );
  }



  searchResultListView(AsyncSnapshot<List<UnitModel>> snapshot) {
    return Expanded(
      child: GestureDetector(
          child: GridView.count(
            crossAxisCount: 1,
            childAspectRatio: 1.0,
            mainAxisSpacing: 4.0,
            crossAxisSpacing: 4.0,
            children: snapshot.data!
            .map(
          (unitModel) {
            return GestureDetector(
              child: GridTile(
                child: searchResultList(unitModel),
                
              ),
              onTap: () {
                //itemClick(snapshot);
              },
            );
          },
            ).toList(),
        ),
      ), 
      );
  }



}

