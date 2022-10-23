import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:myapp/model/unit_page_model.dart';
import '../model/front_model.dart';
import '../model/notice_screen_model.dart';
import '../screen/gridcell.dart';
import '../screen/noticeCell.dart';
import '../services/front_service.dart';
import '../services/unit_service.dart';


class exampleScreen extends StatefulWidget {
  exampleScreen() : super();

  @override
  exampleScreenState createState() => exampleScreenState();
}

class exampleScreenState extends State<exampleScreen> {
  
  noticeGridview(AsyncSnapshot<List<NoticeScreenModel>> snapshot) {
      return Padding(
          padding: const EdgeInsets.all(5.0),
          child: GridView.count(
            crossAxisCount: 1,
            children: snapshot.data!
            .map(
              (noticeScreenModel) {
                return GridTile(
                    child: NoticeCell(noticeScreenModel),
                );
              },
            ).toList(),
          ),
      );
    }


  circularProgress() {
    return const Center(child: CircularProgressIndicator());
  }
  
  
  @override
  Widget build(BuildContext context) {



    ScreenUtil.init(context, designSize: const Size(896, 414));

    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
                children: <Widget>[

                  Container(
                    color: Colors.pink,
                    height: 150,
                    child: Flexible(
                    child: FutureBuilder<List<NoticeScreenModel>>(
                    future: FrontService.noticeScreenService(),
                    builder: (context, snapshot) {
                       if (snapshot.hasError) {
                        return Text('Error ${snapshot.error}');
                      }
                      if (snapshot.hasData) {
                        return noticeGridview(snapshot);
                      }
                      return circularProgress();
                    }
                )     ),
                  ),



                  
                ]
      )
    );
  }

}


