import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'storage_detail_page.dart';
import 'storage_edit_page.dart';
import 'storage_imgaes.dart';
import 'strorage_controller.dart';

class StorageForm extends StatelessWidget {
  final int storage_index;
  final String storage_name;
  final String storage_location;
  final String storage_image;

  const StorageForm({
    required this.storage_index,
    required this.storage_name,
    required this.storage_location,
    required this.storage_image,
  });

  @override
  Widget build(BuildContext context) {
    StorageController s = Get.put(StorageController());
    return Container(
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: InkWell(
          onTap: () {
            s.findByName(s.storages[this.storage_index].storageName!);
            Get.to(() => StorageDetailPage(
                  storage_name: this.storage_name,
                  storage_index: this.storage_index,
                ));
          },
          child: Material(
            borderRadius: BorderRadius.circular(10),
            elevation: 5,
            child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(15),
                  color: Colors.white70,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    StorageImage(
                      image_link: storage_image,
                      storage_name: storage_name,
                    ),
                    SizedBox(height: 20),
                    Text(
                      "  이름: " + storage_name,
                      // style: TextStyle(fontWeight: FontWeight.bold)
                    ),
                    Text(
                      "  위치: " + storage_location,
                      // style: TextStyle(fontWeight: FontWeight.bold)
                    ),
                    SizedBox(height: 20),
                    SizedBox(
                      height: 30,
                      child: Row(
                        children: [
                          Expanded(
                            child: TextButton(
                              onPressed: () {
                                Get.to(() => StorageEditPage(
                                      storage_index: this.storage_index,
                                      storage_name: this.storage_name,
                                      storage_location: this.storage_location,
                                    ));
                              },
                              child: Text("수정"),
                              style: TextButton.styleFrom(
                                  padding: EdgeInsets.zero,
                                  alignment: Alignment.center),
                            ),
                          ),
                          Expanded(
                            child: TextButton(
                              onPressed: () async {
                                await s.deleteByName(this.storage_name);
                              },
                              child: Text("삭제"),
                              style: TextButton.styleFrom(
                                  padding: EdgeInsets.zero,
                                  alignment: Alignment.center),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                )),
          ),
        ),
      ),
    );
  }
}
