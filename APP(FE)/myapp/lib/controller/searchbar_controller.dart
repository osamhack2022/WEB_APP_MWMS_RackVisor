import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';
import '../model/login_model.dart';
import '../model/searchbar_model.dart';
import '../services/web_service.dart';
class SearchBarController extends GetxController {
  Album album2;

  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }

  searchBar() {
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

    void upadateList() {
    setState(( {
      album.where((element) => element.title)
    }))
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

