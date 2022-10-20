import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:myapp/utils/global_colors.dart';



class NoticeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.all(25),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          color: Colors.white
          ),
        child: Column(
          children: [
    
            // 공지사항틀 제목
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: const [
                Text("공지사항",
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),),
                //공지사항 3개 screen에 more
                Icon(Icons.more_horiz),
              ],
            ),

            SizedBox(
              height: 20,
            ),
    
  
            NoticeScreenTile(
              icon: Icons.favorite,
              noticeName: "제목 1",
              subtitle: "1내용입니다",
            ),
            NoticeScreenTile(
              icon: Icons.favorite,
              noticeName: "제목 2",
              subtitle: "2내용입니다",
            ),
            NoticeScreenTile(
              icon: Icons.favorite,
              noticeName: "제목 3",
              subtitle: "3내용입니다",
            ),
    
          ],
        ),
    );
  }

}



class NoticeScreenTile extends StatelessWidget {
  final icon;
  final String noticeName;
  final String subtitle;

  const NoticeScreenTile({
    required this.icon,
    required this.noticeName,
    required this.subtitle,
  });


  @override
    Widget build(BuildContext context) {
      return Container(
        child: Padding(
      padding: EdgeInsets.only(bottom: 12.0),
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(      
              children: [

                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: EdgeInsets.all(16),
                    //아이콘테두리 색깔
                    color: Colors.orange,
                    //아이콘 색깔밑 아이콘 모양
                    child: Icon(icon,
                    color: Colors.white,)
                    ),
                ),

                SizedBox(width: 12),

                Column(
                  children: [
                    //title 게시물 제목입니다.
                    Text(noticeName,
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),),

                    SizedBox(height: 5),
                    //subtitle 게시물 내용
                    Text(subtitle,
                    style: TextStyle(
                      color: GlobalColors.brightGrey,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                    ),
                  ],
                ),      
              ],
            ),
            // noticeScreen 점 3개 more
                Icon(Icons.more_horiz),


          ],
        )
      ),
    )
  );
  }
}