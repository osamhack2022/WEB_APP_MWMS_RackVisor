 
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/utils/global_colors.dart';
import '../model/front_model.dart';
import '../model/notice_screen_model.dart';
import '../model/warehouse_model.dart';
import '../screen/noticeCell.dart';

import '../services/Image_service.dart';
import '../services/front_service.dart';


 
class FirstPage extends StatefulWidget {
 FirstPage() : super();

  @override
  State<FirstPage> createState() => _FirstPage();
}
 
 
class _FirstPage extends State<FirstPage> {
 
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


  



  Future uploadImage() async {
    final uri = Uri.parse("https://211.37.150.202:80/api/warehouses/house-image/2");
    var request = http.MultipartRequest('POST',uri);
    //request.fields['name'] = nameController.text;
    var pic = await http.MultipartFile.fromPath("images", _imageFile!.path);
    request.files.add(pic);
    var response = await request.send();

    if(response.statusCode == 200) {

    }
  }

 getImage() {
        return FutureBuilder<WarehouseImage>  (
          future: warehousesImage,
          builder: (context, snapshot)  {
            if (snapshot.hasData) {
              return Image.network(snapshot.data!.imgBase64);
            } else if (snapshot.hasError) {
              return Text("${snapshot.error}");
            } return const CircularProgressIndicator();
          }
        );
      }




  noticeGridview(AsyncSnapshot<List<NoticeScreenModel>> snapshot) {
      return Padding(
          padding: const EdgeInsets.all(5.0),
          child: ListView(
            
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
  

      
  FrontModel frontModel = Get.put(FrontModel());

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
      
    
    
    //부대 이미지 변경 카메라 클릭시 발생
    Widget bottomSheet() {

      void takePhoto(ImageSource source) async {
      final pickedFile = await _picker.pickImage(
        source: source
      );
      setState(() {
        _imageFile = pickedFile!;
        uploadImage();
      });
    }

      return Container(
        height: 100.h,
        width: MediaQuery.of(context).size.width,
        margin: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 20,
        ),
        child: Column(
          children: <Widget>[
            Text(
              "사진을 선택하세요",
              style: TextStyle(
                fontSize: 20.0.sp,
              ),
            ),
            //구분 여백
            SizedBox(
              height: 20.0.h,
            ),
 
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget> [
                TextButton.icon(
                  icon: Icon(Icons.camera),
                  onPressed: () {
                   takePhoto(ImageSource.camera);
                  },
                  label: Text("카메라",
                  style: TextStyle(color: Colors.black),
                  ),
 
                ),
 
                TextButton.icon(
                  icon: Icon(Icons.image),
                  onPressed: () {
                   takePhoto(ImageSource.gallery);
                  },
                  label: Text("갤러리")
                ),
              ]
            )
          ]
        ),
      );
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
                  Stack(
                    children: [
                      
                       
                      Center(
                        child: getImage(),
                      ),
                      

                  Positioned(
                bottom: 50.0.h,
                right: 50.0.w,
                child: InkWell(
                  child: Icon(Icons.camera_alt,
                  color: GlobalColors.brightGrey,
                  size: 24.h,
                  ),
                  onTap: () {
                    showModalBottomSheet(
                      context: context,
                      builder: ((builder) => bottomSheet()));
                  },
                ),
              ), 
            ],
          )
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