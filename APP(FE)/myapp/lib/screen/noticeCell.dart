import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
        content: noticeScreenModel.content,
        authorId: noticeScreenModel.authorId,
        postingUnitId: noticeScreenModel.postingUnitId,
        createdAt: noticeScreenModel.createdAt,
      ),
    );
  }
}



  


class NoticeScreenTile extends StatelessWidget {
  final id;
  final content;
  final title;
  final authorId;
  final postingUnitId;
  final createdAt;
  

  const NoticeScreenTile({
    required this.id, // 아이디
    required this.title, //제목
    required this.content, // 내용
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
          color: GlobalColors.brightGrey,
          borderRadius: BorderRadius.circular(16),
        ),
        child:
            Column(      
              crossAxisAlignment: CrossAxisAlignment.start,
         
              children: [
                
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
           
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        
                        padding: EdgeInsets.all(16),
                        //아이디
                        color: Colors.purple,
                        //아이디?
                        child: Text(id.toString(),
                        overflow: TextOverflow.ellipsis,),
                        
                      )
                    ),



                    //title 게시물 제목입니다.



 Container(
      
                      child: Text(title,
                      
                        style: TextStyle(
                        color: Color(0xFF373737),
                        fontWeight: FontWeight.bold,),
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        
                        softWrap: false,
                      )),




                    //작성자
                        
                      

 Container(

                      child :Text(
                        "작성자 : " + authorId.toString(),
                        style: TextStyle(
                        color: Color(0xFF373737),
                        fontWeight: FontWeight.w400,),
                        overflow: TextOverflow.ellipsis,
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        softWrap: false,
                      ))





                  ],
                ),
                SizedBox(height: 5,),
                Divider(thickness: 6,
                color: Colors.black38,),

                SizedBox(height: 20,),
                    
                 

                        

                      
        

                    SizedBox(height: 10),

                    // 게시물 내용
                    Text(content,
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w800,
                      fontSize: 20,
                    ),),




              ],
            ),
  
        )
      ),
  );
  }
}
