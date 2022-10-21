class DeleteAddEdit {
  final int? result;

  DeleteAddEdit({this.result});

  DeleteAddEdit.fromJson(Map<String, dynamic> json) : result = json["result"];
}
