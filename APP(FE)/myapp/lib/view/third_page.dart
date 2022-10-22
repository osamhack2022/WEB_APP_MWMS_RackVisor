import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../stroage/custom_add_form.dart';
import '../stroage/storage_form.dart';
import '../stroage/strorage_controller.dart';

class ThirdPage extends StatelessWidget {
  //새로 고침
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
              Get.to(() => CustomAddForm());
            },
            child: Icon(Icons.add, color: Colors.black),
          ),
          body: Column(
            
            children: [
              Expanded(
                child: Padding(
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

              
            ],
          ),
        ),
      ),
    );
  }
}
