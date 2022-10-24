import 'package:flutter/material.dart';
import 'package:myapp/model/notice_screen_model.dart';
import 'package:myapp/utils/global_colors.dart';
import '../utils/constants.dart';

class NoticeCell extends StatelessWidget {
  const NoticeCell(this.noticeScreenModel, {super.key});
  @required
  final NoticeScreenModel noticeScreenModel;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: NoticeScreenTile(
        id: noticeScreenModel.id,
        title: noticeScreenModel.title,
        content: Text("미구현"),
        subtitle: noticeScreenModel.content,
        authorId: Text("미구현"),
        postingUnitId: Text("미구현"),
        createdAt: Text("미구현"),
      ),
    );
  }
}



  


class NoticeScreenTile extends StatelessWidget {
  final id;
  final content;
  final title;
  final subtitle;
  final authorId;
  final postingUnitId;
  final createdAt;
  

  const NoticeScreenTile({
    required this.id, // 아이디
    required this.title, //제목
    required this.content, // 내용

    required this.subtitle,  // 부제목
    required this.authorId,
    required this.postingUnitId,
    required this.createdAt,
  });


  @override
    Widget build(BuildContext context) {
      return Container(
        child: Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Container(
        padding: const EdgeInsets.all(16),
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
                    //아이디
                    color: Colors.orange,
                    //아이디?
                    child: Text(id.toString()),
                  )
                ),

                const SizedBox(width: 12),

                Column(
                  children: [
                    //title 게시물 제목입니다.
                    Text(title,
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),),

                    SizedBox(height: 5),
                    //subtitle 게시물 내용
                    Text(subtitle,
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                    ),
                  ],
                ),      
              ],
            ),
          ],
        )
      ),
    )
  );
  }
}
