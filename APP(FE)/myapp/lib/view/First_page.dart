import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/utils/global_colors.dart';

class FirstPage extends StatelessWidget {

  SearchBarController searchBarController = Get.put(SearchBarController());


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalColors.mainColor,
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            InkWell(
              child: Container(
                color: Colors.blueGrey,
                child: const Text('검색쪽으로 이동'),
                ),
              onTap: () => Get.toNamed('/searchPage'),
            ),
          ],
        ),
      ),
    );
  }
}

