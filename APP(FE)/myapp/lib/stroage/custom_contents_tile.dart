import 'package:flutter/material.dart';

class CustomContentsTile extends StatelessWidget {
  final String content_name;
  final int? content_amount;

  const CustomContentsTile({
    required this.content_name,
    required this.content_amount,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(Icons.view_headline),
      title: Text(content_name),
      subtitle: Text("개수: ${content_amount}개"),
    );
  }
}
