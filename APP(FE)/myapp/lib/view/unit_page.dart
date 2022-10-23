import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';
import 'package:myapp/screen/gridcell.dart';

import '../services/unit_service.dart';


class UnitPage extends StatefulWidget {
  UnitPage() : super();
  final String title = "부대선택";

  @override
  UnitPageState createState() => UnitPageState();
}



class UnitPageState extends State<UnitPage> {

  gridview(AsyncSnapshot<List<UnitModel>> snapshot) {
    return Padding(
      padding: const EdgeInsets.all(5.0),
      child: GridView.count(
        crossAxisCount: 2,
        childAspectRatio: 1.0,
        mainAxisSpacing: 4.0,
        crossAxisSpacing: 4.0,
        children: snapshot.data!
        .map(
          (unitModel) {
            return GestureDetector(
              child: GridTile(
                child: UnitCell(unitModel),
              ),
              onTap: () {
                cellClick(unitModel);
              },
            );
          },
        ).toList(),
      ),
    );
  }

  cellClick(UnitModel unitModel) {
    Get.toNamed("/frontPage", arguments: unitModel);
    

    //페이지 데이터 삭제후 이동
    //Get.off(() =>FrontPage(), arguments: album.title)
  }

  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }

  void _showUnitaddDialog(BuildContext context) {
    showDialog(
      context: context, 
      barrierDismissible: false,
      builder: (BuildContext ctx) {
        return AlertDialog(
          content: Container(
            width: MediaQuery.of(context).size.width * 0.7,
            height: 200,
            child: Column(children: [
              const Text("부대 추가하기"),

              //부대이름 추가하기
              TextFormField(
                style: const TextStyle(color: Color(0xFF373737)),
                decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: '부대를 입력하세요',
                hintStyle: TextStyle(color: Colors.white),
                  ),
                  
              ),


              TextFormField(
                style: const TextStyle(color: Color(0xFF373737)),
                decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: '내용을 입력하세요',
                hintStyle: TextStyle(color: Colors.white),
                  ),
              ),
            ],),
          ),

          actions: [
            TextButton(
              child: Text("추가하기"),
              onPressed: () {

              },
            ),

            TextButton(
              child: Text("취소"),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),


          ],
        );
      }
      );
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Colors.white,
        onPressed: () {
          _showUnitaddDialog(context);
        },
      ),

      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Flexible(
            child: FutureBuilder<List<UnitModel>>(
                future: UnitService.getPhotos(),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return Text('Error ${snapshot.error}');
                  }
                  if (snapshot.hasData) {
                    return gridview(snapshot);
                  }
                  return circularProgress();
                }),
          )
        ],
      ),
    );
  }
}
