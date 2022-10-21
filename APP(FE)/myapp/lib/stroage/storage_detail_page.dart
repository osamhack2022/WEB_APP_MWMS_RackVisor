import 'package:flutter/material.dart';
import 'storage_detail.page,_imgaes.dart';
import 'storage_detail_page_contents.dart';

class StorageDetailPage extends StatelessWidget {
  final String storage_name;
  final int storage_index;

  const StorageDetailPage({
    required this.storage_name,
    required this.storage_index,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.black),
        centerTitle: true,
        title: Text(this.storage_name),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: Icon(Icons.arrow_back),
          ),
        ],
      ),
      body: ListView(
        children: [
          SizedBox(height: 50),
          StorageDetailPageImages(storage_index: this.storage_index),
          SizedBox(height: 50),
          StorageDetailPageContents(storage_name: this.storage_name),
        ],
      ),
    );
  }
}
