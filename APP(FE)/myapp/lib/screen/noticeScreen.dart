import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class NoticeScreen extends StatelessWidget {
  @override
    Widget build(BuildContext context) {
      return Container(
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16.0),
            side: BorderSide(width: 2.0.w),
          ),
          elevation: 2.0.w,
          color: Colors.white,
          child: Column(children: [
            noticeScreenBuilder(),
            noticeScreenBuilder(),
            noticeScreenBuilder(),
          ],)
        ),
      );
    }
 
 
  noticeScreenBuilder() {
    return const Card(
      child: ListTile(
        // 공지사항 이미지
        leading: FlutterLogo(size:72.0),
        title: Text('제목입니다.'),
        subtitle: Text(
          '내용 미리보기입니다.'
        ),
        trailing: Icon(Icons.more_vert),
        isThreeLine: true,
      ),
    );
  }
}
 
 
