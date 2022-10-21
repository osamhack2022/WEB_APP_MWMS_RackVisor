import 'package:flutter/material.dart';

class CustomEditTextFormField extends StatelessWidget {
  final String title;
  final myValid;
  final controller;

  const CustomEditTextFormField({
    required this.title,
    required this.myValid,
    this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        TextFormField(
          // validator: (value) => value!.isEmpty ? "Please enter some text" : null
          // 값이 없으면 Please enter some text 경고 화면 표시
          controller: controller,
          validator: myValid, // Bonus way to provide validator
          obscureText: title == "Password" ? true : false,
          decoration: InputDecoration(
            fillColor: Colors.white,
            filled: true,
            hintText: "$title",
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black, width: 1),
              borderRadius: BorderRadius.circular(20),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black, width: 2),
              borderRadius: BorderRadius.circular(20),
            ),
            errorBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black, width: 1),
              borderRadius: BorderRadius.circular(20),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: Colors.black, width: 2),
              borderRadius: BorderRadius.circular(20),
            ),
          ),
        ),
      ], //children
    );
  }
}
