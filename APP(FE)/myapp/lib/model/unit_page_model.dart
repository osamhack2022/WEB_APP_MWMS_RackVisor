class UnitModel {
  int id;
  String name;
  String comment;

  UnitModel({required this.id,required this.name, required this.comment});

  factory UnitModel.fromJson(Map<String, dynamic> json) {
    return UnitModel(
      id: json['id'] as int,
      name: json['name'] as String,
      comment :json['comment'] as String,
    );
  }


}

