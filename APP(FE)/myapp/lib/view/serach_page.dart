/*import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:myapp/services/web_service.dart';
import 'package:myapp/utils/global_colors.dart';

import '../model/searchbar_model.dart';
import '../model/unit_page_model.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPage();
}


class _SearchPage extends State<SearchPage> {


  //검색결과 list 데이터 미리 받아오기
  createSearchList(AsyncSnapshot<List<Album>> snapshot) {
    List<Album> main_search_list = snapshot.data!.toList();

  
  }

      

  


listView(AsyncSnapshot<List<Album>> snapshot) {
    return Padding(
      padding: const EdgeInsets.all(5.0),
      child: GridView.count(
        crossAxisCount: 2,
        childAspectRatio: 1.0,
        mainAxisSpacing: 4.0,
        crossAxisSpacing: 4.0,
        children: snapshot.data!
        .map(
          (album) {
            return GestureDetector(
              child: GridTile(
                child: AlbumCell(album),
              ),
              onTap: () {
                cellClick(album);
              },
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

    
    void searchAlbum(String query) {
      final suggestions = albumData.where((book){
        final albumTitle = book.title.toLowerCase();
        final input = query.toLowerCase();

        return albumTitle.contains(input);
      }).toList();
      setState(() {
        albumData = suggestions;
      });
    }

    


    return Scaffold(
      backgroundColor: GlobalColors.backgroundColor,
      appBar: AppBar(
        backgroundColor: GlobalColors.backgroundColor,
        elevation: 0.0
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            //맨위 검색하세요 검색바 위
            Text("검색하세요",
            style: TextStyle(
              color: GlobalColors.textColor
            )),


            SizedBox(height: 20.0.h,),
            
            // 인풋 내부
            TextField(
              style: TextStyle(
                color: GlobalColors.textColor
                ),
              decoration: InputDecoration(filled: true,
              fillColor: GlobalColors.backgroundColor,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8.0),
                borderSide: BorderSide.none,
                ),
                hintText: "검색어를 입력하세요",
                suffixIcon: Icon(Icons.search),
                prefixIconColor: Colors.purple.shade900
                ),
                onChanged: searchAlbum
            
            ),
            SizedBox(height: 20.0.h,),
            Expanded(
              child: FutureBuilder<List<Album>>(
                future: WebService.getPhotos(),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return Text('Error ${snapshot.error}');
                  }
                  if (snapshot.hasData) {
                    
                    return ListView.builder(
                      
                      itemCount: createSearchList(snapshot).main_search_list.length,
                      itemBuilder: (context, index) {
                        final book = createSearchList(snapshot)[index];
                        final albumData = createSearchList(snapshot);

                        return ListTile(
                          leading: Image.network(
                            book.thumbnailUrl,
                            fit: BoxFit.cover,
                            width: 50.w,
                            height: 50.h,
                          ),
                          title: book.title,
                        );
                      } 
                      );
                  }
                  return circularProgress();
                }),
                


            ),


          ],
        )
      )
    ); 
  }

}*/