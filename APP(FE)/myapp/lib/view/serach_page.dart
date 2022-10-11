import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/services/web_service.dart';
import 'package:myapp/utils/global_colors.dart';

import '../model/unit_page_model.dart';
import 'gridcell.dart';

class SearchPage extends StatelessWidget {

  SearchBarController searchBarController = Get.put(SearchBarController());


gridview(AsyncSnapshot<List<Album>> snapshot) {
    return Padding(
      padding: const EdgeInsets.all(5.0),
      child: GridView.count(
        crossAxisCount: 2,
        childAspectRatio: 1.0,
        mainAxisSpacing: 4.0,
        crossAxisSpacing: 4.0,
        children: snapshot.data!
        .map(
          (album) {
            return GestureDetector(
              child: GridTile(
                child: AlbumCell(album),
              ),
              onTap: () {
                cellClick(album);
              },
            );
          },
        ).toList(),
      ),
    );
  }

  cellClick(Album album) {
    Get.toNamed("/frontPage", arguments: album.title);

    //페이지 데이터 삭제후 이동
    //Get.off(() =>FrontPage(), arguments: album.title)
  }

  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }







  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      backgroundColor: GlobalColors.mainColor,
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            InkWell(
              child: searchBarController.SearchBar(),
              
              onTap: () {            
                Expanded(
                child: FutureBuilder<List<Album>>(
                  future: WebService.getPhotos(),
                  builder: (context, snapshot) {
                    if (snapshot.hasError) {
                      return Text('Error ${snapshot.error}');
                    }
                    if (snapshot.hasData) {
                      return gridview(snapshot);
                    }
                    return circularProgress();
                  }),
              );

              },
            )
          ],
        ),
      ),
    );
  }
}

