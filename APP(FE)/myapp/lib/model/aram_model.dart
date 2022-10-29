class AramModel {
  int id;
  String name;
  int amount;
  String barcode;
  String comment;
  String expirationDate;
  int storedBoxId;



  AramModel({
    required this.id, required this.name, required this.amount,
    required this.barcode, required this.comment, required this.expirationDate,
    required this.storedBoxId});

  factory AramModel.fromJson(Map<String, dynamic> json) {
    return AramModel(
      id: json['id'] as int,
      name: json['name'] as String,
      amount: json['amount'] as int,
      barcode: json['barcode'] as String,
      comment: json['comment'] as String,
      expirationDate: json['expirationDate'] as String,
      storedBoxId: json['storedBoxId'] as int,
    );
  }


    Map<String, dynamic> toJson() =>
    {
      'id' : id,
      'name': name,
      'amount': amount,
      'barcode': barcode,
      'comment': comment,
      'expirationDate': expirationDate,
      'storedBoxId': storedBoxId
    };

}
