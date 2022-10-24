 
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/model/aram_model.dart';
import 'package:myapp/utils/global_colors.dart';
import '../model/front_model.dart';
import '../model/notice_screen_model.dart';
import '../model/warehouse_model.dart';
import '../screen/noticeCell.dart';

import '../screen/pageCell.dart';
import '../services/Image_service.dart';
import '../services/front_service.dart';


 
class FirstPage extends StatefulWidget {
 FirstPage() : super();

  @override
  State<FirstPage> createState() => _FirstPage();
}
 
 
class _FirstPage extends State<FirstPage> {
  FrontModel frontModel = Get.put(FrontModel());
  SearchBarController searchBarController = Get.put(SearchBarController());
  
 
  final ImagePicker _picker = ImagePicker();
  XFile? _imageFile;
  Future<WarehouseImage>? warehousesImage;


  @override
	void initstate() {
		super.initState();
		warehousesImage = ImageService.ImageService2();
	}

  
  @override
	void dispose() {
		super.dispose();
		build(context);
	}



 






  noticeGridview(AsyncSnapshot<List<NoticeScreenModel>> snapshot) {
      return Padding(
          padding: const EdgeInsets.all(5.0),
          child: PageView(
            children: snapshot.data!
            .map(
              (noticeScreenModel) {
                return PageView.builder(
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      child: NoticeCell(noticeScreenModel),
                    );
                  }
                  );
              },
            ).toList(),
          ),
      );
    }



      AramGridview(AsyncSnapshot<List<AramModel>> snapshot) {
      return Padding(
          padding: const EdgeInsets.all(5.0),
          child: PageView(
            children: snapshot.data!
            .map(
              (aramModel) {
                return PageView.builder(
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      child: PageCell(aramModel),
                    );
                  }
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
  void setState(VoidCallback fn) {
    // TODO: implement setState
    super.setState(fn);
  }
 
 
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(896, 414)); 
  

  // 공지사항 관련 service 2개
  List<NoticeScreenModel> parseNotice(String responsebody) {
      final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
      return parsed.map<NoticeScreenModel>((json) => NoticeScreenModel.fromJson(json)).toList();
  }

   Future<List<NoticeScreenModel>> noticeScreenService() async {
      var uri = await Uri.parse("https://211.37.150.202:80/api/posts/unit-posts/${frontModel.selectId}");

        final response = await http.get(
        (uri), 
        headers: {"Content-Type": "application/json"},);

        List<NoticeScreenModel> list = parseNotice(response.body);

        return list;
  }



  //알림 관련 service 2개
  List<AramModel> parseAram(String responsebody) {
      final parsed = json.decode(responsebody).cast<Map<String, dynamic>>();
      return parsed.map<AramModel>((json) => AramModel.fromJson(json)).toList();
  }

   Future<List<AramModel>> AramService() async {
      var uri = await Uri.parse("https://211.37.150.202:80/api/stocks/by-expiration-date/${frontModel.selectId}");

        final response = await http.get(
        (uri), 
        headers: {"Content-Type": "application/json"},);

        List<AramModel> list = parseAram(response.body);

        return list;
  }




      
    
    
  
   



    return Scaffold(
      body: CustomScrollView(
        slivers: [ 
          SliverAppBar(
            //백버튼 막기
            automaticallyImplyLeading: false,
            elevation: 5,
            backgroundColor: Colors.white,
            expandedHeight: 220.h,
            flexibleSpace: FlexibleSpaceBar(
                  //이미지
                  background:  
           
                      Container(
                        height: 150.h,
                        padding: EdgeInsets.only(top: 20.w,left: 40.w,right: 40.w),
                        child: FutureBuilder<List<NoticeScreenModel>>(
                        future: noticeScreenService(),
                        builder: (context, snapshot) {
                           if (snapshot.hasError) {
                            return Text('Error ${snapshot.error}');
                          }
                          if (snapshot.hasData) {
                            return noticeGridview(snapshot);
                          }
                          return circularProgress();
                        }
                )  
                      ),

        ),
        ),

          //메인 밑
          SliverToBoxAdapter(
            child: Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [

                  SizedBox(
                    height: 20.h,
                  ),

                  Container(
                    padding: EdgeInsets.only(left: 40.w,right: 40.w),
                    height: 30.h,
                    child: searchBarController.searchBar(),
                  ),

                  Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                children: <Widget>[

         
                      Container(
                        height: 150.h,
                        padding: EdgeInsets.only(top: 20.w,left: 40.w,right: 40.w),
                        child: FutureBuilder<List<AramModel>>(
                        future: AramService(),
                        builder: (context, snapshot) {
                           if (snapshot.hasError) {
                            return Text('Error ${snapshot.error}');
                          }
                          if (snapshot.hasData) {
                            return AramGridview(snapshot);
                          }
                          return circularProgress();
                        }
                )  
                      ),
             
                 



                  
                ]
      )

                  


                
                
                
   
              ]),
            ),
          )
        ],
      ),
    );
 
 
 
  }
}
