class SearchbarModel {
  String? title;
  int? count;
  String? article_image_url;

  SearchbarModel({this.title, this.count, this.article_image_url});

  factory SearchbarModel.fromJson(Map<String, dynamic> json) {
    return SearchbarModel(
      title: json['title'] as String,
      count: json['count'] as int,
      article_image_url: json['article_image_url'] as String,
    );
  }
}