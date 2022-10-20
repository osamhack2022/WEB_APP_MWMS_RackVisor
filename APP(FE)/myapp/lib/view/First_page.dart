 
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:myapp/controller/searchbar_controller.dart';
import 'package:myapp/screen/noticeScreen.dart';
import 'package:myapp/utils/global_colors.dart';

 
class FirstPage extends StatefulWidget {

 
  @override
  State<FirstPage> createState() => _FirstPage();
}
 
 
class _FirstPage extends State<FirstPage> {
 
  SearchBarController searchBarController = Get.put(SearchBarController());
 
 
  final ImagePicker _picker = ImagePicker();
  XFile? _imageFile;
 
 
 
  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(896, 414));
    
    
    //부대 이미지 변경 카메라 클릭시 발생
    Widget bottomSheet() {

      void takePhoto(ImageSource source) async {
      final pickedFile = await _picker.pickImage(
        source: source
      );
      setState(() {
        _imageFile = pickedFile!;
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
                  label: Text("카메라")
 
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
      backgroundColor: GlobalColors.mainBackgroundColor,
      
      body: CustomScrollView(
        slivers: [ 
          SliverAppBar(
          elevation: 5,
          backgroundColor: Colors.white,
          expandedHeight: 220.h,
          flexibleSpace: FlexibleSpaceBar(
            
                  //이미지
                  background:  
                  Stack(
                    children: [
                      
                      if (_imageFile == null) 
                      Center(
                        child: Image.asset("images/no_image.png",
                      width: double.maxFinite,
                      fit: BoxFit.cover,) 
                      )
                      else Image.network(_imageFile!.path,
                      width: double.maxFinite,
                      fit: BoxFit.cover,),
                     

                  Positioned(
                bottom: 50.0.h,
                right: 50.0.w,
                child: InkWell(
                  child: Icon(Icons.camera_alt,
                  color: GlobalColors.brightGrey,
                  size: 36.h,
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
              
              Container(
                padding: EdgeInsets.all(40.w),
                child: NoticeScreen(),
              )
              // 공지사항
              
   
            ]),
          )
        ],
      ),
    );
 
 
 
  }
}
