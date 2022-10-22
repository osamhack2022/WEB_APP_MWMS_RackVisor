import 'package:flutter/material.dart';
import 'package:myapp/model/unit_page_model.dart';

import '../utils/constants.dart';

class UnitCell extends StatelessWidget {
  const UnitCell(this.unitModel, {super.key});
  @required
  final UnitModel unitModel;

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
        ),
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Container(
            alignment: Alignment.center,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Flexible(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10.0),
                  child: Text(
                  unitModel.name,
                  maxLines: 1,
                  softWrap: true,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: kDarkSecondaryColor,
                    fontSize: 20.0, 
                    fontWeight: FontWeight.w500
                    ),
                ),
                  ) 
                ),
                Padding(
                  padding: const EdgeInsets.all(10.0),

                )
            ]),
          ),
        ),
    );
  }
}
