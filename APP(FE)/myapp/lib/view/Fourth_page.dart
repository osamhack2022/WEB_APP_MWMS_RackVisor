import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:get/get.dart';
import 'package:myapp/model/login_model.dart';
import 'package:myapp/utils/global_colors.dart';

class FourthPage extends StatelessWidget {
  LoginModel loginModel = Get.put(LoginModel());

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(896, 414));

    var userInfo = Expanded(
                child: Column(
                  children: [
                    Container(
                      height:  10.w * 10,
                      width: 10.w * 10,
                      margin: EdgeInsets.only(top: 10.w * 3),
                      child: Stack(
                        children: [
                          // 이미지 원모양안
                          CircleAvatar(
                          radius: 10.w * 5,
                          backgroundImage: NetworkImage(loginModel.unitPhotos),
                        ),

                        Align(
                        alignment: Alignment.bottomRight,
                        child: Container(                  
                          height: 10.w * 2.5,
                          width: 10.w * 2.5,
                          decoration: const BoxDecoration(
                          color: Colors.black,
                          shape: BoxShape.circle
                        ),     
                        child: Icon(
                          Icons.add,
                        color: GlobalColors.textColor,
                        size: ScreenUtil().setSp(10.w * 1.5),
                                ),
                            ),
                          ),   
                        ]
                      ), 
                    ),
                    SizedBox(height: 10.w * 2),

                    Text(loginModel.unitName),
                    SizedBox(height: 10.w * 0.5),

                  ],
                ),
              );
    return Scaffold(
      body: Column(
        children: [

          SizedBox(height: 10.w * 5),

          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(width: 10.w * 3),

              Icon(Icons.access_alarm_sharp, 
              size: ScreenUtil().setSp(10.w * 3), 
              ),

              userInfo,



            ],
          ) 
      ]),
    );
  }
}