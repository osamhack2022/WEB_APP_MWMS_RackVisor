import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../model/aram_model.dart';


class AramCell extends StatelessWidget {
  AramCell(this.aramModel, {super.key});
  @required
  final AramModel aramModel;

  var today = DateTime.now();

  //DateFormat('yyyy/MM/dd').format(DateTime.parse(aramModel.expirationDate.substring(aramModel.expirationDate.lastIndexOf("T")+1)).toString)

  @override
  Widget build(BuildContext context) {
    return Container(
      child: AramScreenTile(
        icon: Icons.notifications,
        noticeName: aramModel.name,
        subtitle: aramModel.expirationDate,
      ),
    );
  }
}


class AramScreenTile extends StatelessWidget {
  final icon;
  final String noticeName;
  final String subtitle;

  const AramScreenTile({
    required this.icon,
    required this.noticeName,
    required this.subtitle,
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
                    //아이콘테두리 색깔
                    color: Colors.orange,
                    //아이콘 색깔밑 아이콘 모양
                    child: Icon(icon,
                    color: Colors.white,)
                    ),
                ),

                const SizedBox(width: 12),

                Column(
                  children: [
                    //title 게시물 제목입니다.
                    Text(noticeName,
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
