class StockModel {
  int? id;
  String? name;
  String? type;
  String? specipicType;
  int? amount;
  String? barcode;
  String? comment;
  String? expirationDate;
  int? storedBoxId;
  StockModel(
      {this.id,
      this.name,
      this.type,
      this.specipicType,
      this.amount,
      this.comment,
      this.expirationDate,
      this.storedBoxId});

  StockModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    type = json['type'];
    specipicType = json['specipicType'];
    amount = json['amount'];
    barcode = json['barcode'];
    comment = json['comment'];
    expirationDate = json['expirationDate'];
    storedBoxId = json['storedBoxId'];

  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['name'] = this.name;
    data['type'] = this.type;
    data['specipicType'] = this.specipicType;
    data['amount'] = this.amount;
    data['barcode'] = this.barcode;
    data['comment'] = this.comment;
    data['storedBoxId'] = this.storedBoxId;
    return data;
  }
}
