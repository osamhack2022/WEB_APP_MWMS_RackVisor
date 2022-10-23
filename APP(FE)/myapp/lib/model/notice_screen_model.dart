class NoticeScreenModel {
  int id;
  String title;
  String content;
  int authorId;
  int postingUnitId;
  String createdAt;



  NoticeScreenModel({
    required this.id, required this.title, required this.content,
    required this.authorId, required this.postingUnitId, required this.createdAt,});

  factory NoticeScreenModel.fromJson(Map<String, dynamic> json) {
    return NoticeScreenModel(
      id: json['id'] as int,
      title: json['title'] as String,
      content: json['content'] as String,
      authorId: json['authorId'] as int,
      postingUnitId: json['postingUnitId'] as int,
      createdAt: json['createdAt'] as String,
    );
  }


    Map<String, dynamic> toJson() =>
    {
      'id' : id,
      'title': title,
      'content': content,
      'authorId': authorId,
      'postingUnitId': postingUnitId,
      'createdAt': createdAt,
    };

}
