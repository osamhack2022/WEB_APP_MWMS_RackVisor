import 'package:flutter/material.dart';

class StorageImage extends StatelessWidget {
  final String image_link;
  final String storage_name;

  const StorageImage({required this.image_link, required this.storage_name});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.only(
          topLeft: Radius.circular(10), topRight: Radius.circular(10)),
      child: Stack(
        alignment: Alignment.center,
        children: [
          Image.asset(
            image_link,
            width: 170,
            height: 80,
            fit: BoxFit.cover,
          ),
          Positioned(
            child: Text(
              storage_name,
              style: TextStyle(
                  fontSize: 16,
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }
}
