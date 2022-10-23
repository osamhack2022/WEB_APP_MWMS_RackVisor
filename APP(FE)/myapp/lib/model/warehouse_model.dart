class WarehouseImage {
  final String warehouseImageBinary;

  WarehouseImage({required this.warehouseImageBinary});

  factory WarehouseImage.fromJson(Map<String, dynamic> json) {
    return WarehouseImage(
      warehouseImageBinary: json['warehouseImageBinary'] as String,
    );
  }
}