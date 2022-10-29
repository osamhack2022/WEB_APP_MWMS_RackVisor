import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/services/web_service.dart';
import 'package:myapp/utils/global_colors.dart';

import '../model/unit_page_model.dart';
import 'gridcell.dart';

class SearchPage extends StatelessWidget {

  SearchBarController searchBarController = Get.put(SearchBarController());


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

       
            searchBarController.searchBar(),
             
           

            const SizedBox(height: 20.0,),

            FutureBuilder<List<Album>>(
                future: WebService.getPhotos(),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return Text('Error ${snapshot.error}');
                  }
                  if (snapshot.hasData) {
                    return Expanded(child: searchBarController.searchResultListView(snapshot));
                  }
                  return searchBarController.circularProgress();
                }),     
          ],
        ),
      ),
    );
  }
}

