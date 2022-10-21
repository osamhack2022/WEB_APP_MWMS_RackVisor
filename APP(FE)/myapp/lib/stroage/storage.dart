class Storage {
  final String? id;
  final String? storageName;
  final String? location;
  final String? manager;
  final int? image;

  Storage({
    this.id,
    this.storageName,
    this.location,
    this.manager,
    this.image,
  });

  Storage.fromJson(Map<String, dynamic> json)
      : id = json["_id"],
        storageName = json["storageName"],
        location = json["location"],
        manager = json["manager"],
        image = json["image"];
}
