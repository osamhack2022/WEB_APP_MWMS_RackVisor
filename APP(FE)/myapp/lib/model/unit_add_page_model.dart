class UnitaddModel {
  String name;
  String comment;

  UnitaddModel({required this.name, required this.comment});

  factory UnitaddModel.fromJson(Map<String, dynamic> json) {
    return UnitaddModel(
      name: json['name'] as String,
      comment :json['comment'] as String,
    );
  }


}

