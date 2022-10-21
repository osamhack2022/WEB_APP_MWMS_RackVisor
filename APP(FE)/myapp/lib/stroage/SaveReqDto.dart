class SaveReqDto {
  final String? storageName;
  final String? location;

  SaveReqDto(this.storageName, this.location);

  Map<String, dynamic> toJson() => {
        "storageName": storageName,
        "location": location,
        "manager": "armyTiger",
        "image": 10,
      };
}
