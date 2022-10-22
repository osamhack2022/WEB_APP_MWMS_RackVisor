/*import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'storage_add_page.dart';
import 'storage_form.dart';
import 'strorage_controller.dart';

class StorageMainPage extends StatelessWidget {
  var refreshKey = GlobalKey<RefreshIndicatorState>();
  @override
  Widget build(BuildContext context) {
    List<String> selectedPic = [];

    StorageController s = Get.put(StorageController());

    return Obx(
      () => RefreshIndicator(
        key: refreshKey,
        onRefresh: () async {
          await s.findAll();
        },
        child: Scaffold(
          floatingActionButton: FloatingActionButton(
            tooltip: "창고 추가",
            onPressed: () {
              Get.to(() => StorageAddPage());
            },
            child: Icon(Icons.add, color: Colors.black),
          ),
          body: Padding(
            padding: const EdgeInsets.all(8.0),
            child: GridView.count(
              crossAxisCount: 2,
              children: List.generate(
                s.storages.length,
                (index) => StorageForm(
                  storage_index: index,
                  storage_name: "${s.storages[index].storageName}",
                  storage_location: "${s.storages[index].location}",
                  storage_image: selectedPic[index % 8],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
*/