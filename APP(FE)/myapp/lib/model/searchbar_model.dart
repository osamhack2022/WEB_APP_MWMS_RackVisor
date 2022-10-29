class SearchbarModel {
  String? title;
  String? name;
  String? email;

  SearchbarModel({this.title, this.name, this.email});

  factory SearchbarModel.fromJson(Map<String, dynamic> json) {
    return SearchbarModel(
      title: json['title'] as String,
      name: json['name'] as String,
      email: json['email'] as String,
    );
  }
}