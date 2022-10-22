class LoginModel{
  String militarySerialNumber = '';
  String password = '';

  LoginModel({
    militarySerialNumber,
    password,
  });

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {
      'militarySerialNumber' : militarySerialNumber.trim(),
      'password' : password.trim(),
    };
    return map;
  }

  factory LoginModel.fromJson(Map<String, dynamic> json) {
    return LoginModel(
      militarySerialNumber: json['militarySerialNumber'] as String,
      password: json['name'] as String,
    );
  }

}
