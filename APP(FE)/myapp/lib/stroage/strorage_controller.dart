import 'package:get/get.dart';

import 'content.dart';
import 'storage.dart';
import 'storage_repository.dart';


class StorageController extends GetxController {
  final StorageRepository _storageRepository = StorageRepository();
  final storages = <Storage>[].obs;
  final contents = <Content>[].obs;

  @override
  void onInit() {
    super.onInit();
    findAll();
  }

  Future<void> save(String storageName, String location) async {
    int result = await _storageRepository.save(storageName, location);
    if (result == 1) {
      print("서버 쪽 추가 성공");
    }
  }

  Future<void> updateByStorageName(
      String orgStorageName, String newStorageName, String location) async {
    int result = await _storageRepository.update(
        orgStorageName, newStorageName, location);
    if (result == 1) {
      print("서버 쪽 수정 성공");
    }
  }

  Future<void> deleteByName(String storageName) async {
    int result = await _storageRepository.deleteByName(storageName);
    if (result == 1) {
      print("서버 쪽 삭제 성공");
    }
  }

  Future<void> findAll() async {
    List<Storage> storages = await _storageRepository.findAll();
    this.storages.value = storages;
  }

  Future<void> findByName(String storageName) async {
    List<Content> contents = await _storageRepository.findByName(storageName);
    this.contents.value = contents;
  }
}
