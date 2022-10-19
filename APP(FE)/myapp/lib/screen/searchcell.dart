import 'package:flutter/material.dart';
import 'package:myapp/model/unit_page_model.dart';

class SearchCell extends StatelessWidget {
  const SearchCell(this.album, {super.key});
  @required
  final Album album;

  void searchAlbum(String query) {
      final suggestions = main_search_list.where((album){
        final albumTitle = album.title.toLowerCase();
        final input = query.toLowerCase();

        return albumTitle.contains(input);
      }).toList();
      setState(() {
      main_search_list = suggestions;
      });
    }

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
        ),
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Container(
            alignment: Alignment.center,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Flexible(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10.0),
                  child: FadeInImage(
                    placeholder: const AssetImage("images/no_image.png"),
                    image: NetworkImage(album.thumbnailUrl),
                    width: 100,
                    height: 100,
                   ),
                  ) 
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),
                child: Text(
                  album.title,
                  maxLines: 1,
                  softWrap: true,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 20.0, 
                    fontWeight: FontWeight.w500
                    ),
                ),)
            ]),
          ),
        ),
    );
  }
}
