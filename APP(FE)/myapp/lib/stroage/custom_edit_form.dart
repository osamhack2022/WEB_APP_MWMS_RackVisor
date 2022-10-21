import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'custom_edit_text_form_field.dart';
import 'strorage_controller.dart';


class CustomEditForm extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final int storage_index;
  final _storageName = TextEditingController();
  final _location = TextEditingController();

  CustomEditForm({required this.storage_index});

  @override
  Widget build(BuildContext context) {
    StorageController s = Get.find();
    _storageName.text = "${s.storages[storage_index].storageName}";
    _location.text = "${s.storages[storage_index].location}";
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "창고 이름 수정",
              ),
            ),
            CustomEditTextFormField(
              controller: _storageName,
              title: s.storages[storage_index].storageName!,
              myValid: (value) {
                if (value!.isEmpty) {
                  return "수정할 이름을 입력하세요.";
                } else {
                  return null;
                }
              },
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "창고 위치 수정",
              ),
            ),
            CustomEditTextFormField(
                controller: _location,
                title: s.storages[storage_index].location!,
                myValid: (value) {
                  if (value!.isEmpty) {
                    return "수정할 창고 위치를 입력하세요.";
                  } else {
                    return null;
                  }
                }),

            SizedBox(height: 100),

            Center(
              child: TextButton(
                style: TextButton.styleFrom(
                  textStyle: TextStyle(fontWeight: FontWeight.bold),
                  primary: Colors.black,
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30)),
                  minimumSize: Size(100, 40),
                ),
                onPressed: () {
                  print(_storageName.text);
                  if (_formKey.currentState!.validate()) {
                    s.updateByStorageName(
                        s.storages[storage_index].storageName!,
                        _storageName.text,
                        _location.text);
                    Get.back();
                  }
                },
                child: Text("수정 완료"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
