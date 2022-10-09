import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/unit_page_controller.dart';


class UnitPage extends StatefulWidget {

  @override
  State<UnitPage> createState() => _UnitPageState();
}

class _UnitPageState extends State<UnitPage> {

  @override
  void initState() {
    super.initState();
    Get.find<UnitPageListController>().topHeadlines();
  }




  @override
  Widget build(BuildContext context) {
    UnitPageListController unitPageListController = Get.put(UnitPageListController(context));
    var listViewModel = Get.find<UnitPageListController>();
    
    return Scaffold(
      body: SafeArea(
        child: GridView.builder(gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2
          ),
          itemBuilder: (context, index) {
          return GridTile(
            child: Container(
              child: Image.network(listViewModel.unitPageController[index].imageUrl),
            ),

          );
        },
        itemCount: listViewModel.unitPageController.length,
        ),
      ),
    );
  }
}