class WarehouseImage {
  final String imgBase64;

  WarehouseImage({required this.imgBase64});

  factory WarehouseImage.fromJson(Map<String, dynamic> json) {
    return WarehouseImage(
      imgBase64: json['imgBase64'] as String,
    );
  }
}