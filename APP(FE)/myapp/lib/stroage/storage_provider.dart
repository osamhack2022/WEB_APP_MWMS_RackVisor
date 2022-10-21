import 'package:get/get.dart';

const host = "http://1.1.1.1:111";

class StorageProvider extends GetConnect {
  Future<Response> findAll() => get("$host/storages");

  Future<Response> findByName(String storageName) =>
      get("$host/storages/${storageName}");

  Future<Response> deleteByName(String storageName) =>
      delete("$host/storages/${storageName}");

  Future<Response> update(String storageName, Map data) =>
      put("$host/storages/edit/${storageName}", data);

  Future<Response> save(Map data) => post("$host/storages/add", data);
}
