import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'custom_edit_text_form_field.dart';
import 'strorage_controller.dart';

class CustomAddForm extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final _storageName = TextEditingController();
  final _location = TextEditingController();

  @override
  Widget build(BuildContext context) {
    StorageController s = Get.find();
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
                "창고 이름",
              ),
            ),
            CustomEditTextFormField(
              controller: _storageName,
              title: "창고 이름을 입력하세요.",
              myValid: (value) {
                if (value!.isEmpty) {
                  return "창고 이름을 입력하세요!!";
                } else {
                  return null;
                }
              },
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                "창고 위치",
              ),
            ),
            CustomEditTextFormField(
                controller: _location,
                title: "창고 위치를 입력하세요.",
                myValid: (value) {
                  if (value!.isEmpty) {
                    return "창고 위치를 입력하세요!!";
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
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    await s.save(_storageName.text, _location.text);
                    Get.back();
                  }
                },
                child: Text("추가"),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
