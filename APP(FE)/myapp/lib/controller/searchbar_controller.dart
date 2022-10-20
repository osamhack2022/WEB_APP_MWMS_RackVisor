import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';
import 'package:myapp/utils/global_colors.dart';
import '../model/login_model.dart';
import '../model/searchbar_model.dart';
import '../services/web_service.dart';
class SearchBarController extends GetxController {


  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }

  searchBar() {
    return InkWell(
      child: Container(
      decoration: BoxDecoration(
        
        border: Border.all(
          width: 3,
          color: GlobalColors.backgroundColor
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
          const Expanded(
            flex: 4,
            child: Text("검색하세요"),
          ),

          Divider(thickness: 1,),

          //qr 스캐너 on
          const Expanded(
            flex: 1,
            child: Icon(Icons.search_off),
          ),
       


          ]
        ),
  ),

    );
  }

  searchResultList(Album album) {
    return Card(
      elevation: 5.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
        ),
        child: Container(
          width: 200,
          height: 100,
          child: Center(
            child: Text(album.title),
          ),
        ),
    );
  }



  searchResultListView(AsyncSnapshot<List<Album>> snapshot) {
    return Expanded(
      child: GestureDetector(
          child: GridView.count(
            crossAxisCount: 1,
            childAspectRatio: 1.0,
            mainAxisSpacing: 4.0,
            crossAxisSpacing: 4.0,
            children: snapshot.data!
            .map(
          (album) {
            return GestureDetector(
              child: GridTile(
                child: searchResultList(album),
                
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

