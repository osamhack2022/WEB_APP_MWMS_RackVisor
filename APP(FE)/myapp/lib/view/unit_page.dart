import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/model/unit_page_model.dart';
import 'package:myapp/services/web_service.dart';
import 'package:myapp/view/gridcell.dart';


class UnitPage extends StatefulWidget {
  UnitPage() : super();
  final String title = "부대선택";

  @override
  UnitPageState createState() => UnitPageState();
}



class UnitPageState extends State<UnitPage> {

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
    Get.toNamed("/frontPage", arguments: album);
    

    //페이지 데이터 삭제후 이동
    //Get.off(() =>FrontPage(), arguments: album.title)
  }

  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          Flexible(
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
          )
        ],
      ),
    );
  }
}
