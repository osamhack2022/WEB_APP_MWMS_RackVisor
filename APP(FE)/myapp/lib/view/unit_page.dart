import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
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
  }




  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: SafeArea(
        child: GridView.builder(gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2
          ),
          itemBuilder: (context, indext) {
          return GridTile(
            child: Container(
              
            ),

          );
        }),
      ),
    );
  }
}