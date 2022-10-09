class UnitArticle {
  final String unitname;
  final String author;
  final String url;
  final String urlToImage;

UnitArticle({required this.unitname, required this.author, required this.url, required this.urlToImage});

  factory UnitArticle.fromJson(Map<String, dynamic> json) {
    return UnitArticle(
      unitname: json['unitname'],
      author: json['author'],
      url: json['url'],
      urlToImage: json['urlToImage'],


    );
  }
}