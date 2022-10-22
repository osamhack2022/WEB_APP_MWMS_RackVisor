import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    final String imageLogoName = 'assets/images/public/PurpleLogo.svg';

    var screenHeight = MediaQuery.of(context).size.height;
    var screenWidth = MediaQuery.of(context).size.width;

    return WillPopScope(
      onWillPop: () async => false,
      child: MediaQuery(
        data: MediaQuery.of(context).copyWith(textScaleFactor:1.0),
        child: new Scaffold(
          body: new Container(
            //height : MediaQuery.of(context).size.height,
            //color: kPrimaryColor,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                SizedBox(height: screenHeight * 0.384375),
                Container(
                  child: Image.asset(
                    imageLogoName,
                    width: screenWidth * 0.616666,
                    height: screenHeight * 0.0859375,
                  ),
                ),
                Expanded(child: SizedBox()),
                Align(
                  child: Text("© Copyright 2020, 내방니방(MRYR)",
                      style: TextStyle(
                        fontSize: screenWidth*( 14/360), color: Color.fromRGBO(255, 255, 255, 0.6),)
                  ),
                ),
                SizedBox( height: MediaQuery.of(context).size.height*0.0625,),
              ],
            ),

          ),
        ),
      ),
    );
  }

}