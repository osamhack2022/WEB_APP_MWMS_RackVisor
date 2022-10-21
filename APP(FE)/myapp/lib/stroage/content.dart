class Content {
  final String? NIIN;
  final String? contentName;
  final int? amount;

  Content({
    this.NIIN,
    this.contentName,
    this.amount,
  });

  Content.fromJson(Map<String, dynamic> json)
      : NIIN = json["NIIN"],
        contentName = json["productName"],
        amount = json["image"];
}
