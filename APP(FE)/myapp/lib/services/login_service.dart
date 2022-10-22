import 'package:get/get.dart';
import 'package:http/http.dart';
import '../model/login_model.dart';
import '../view/unit_page.dart';

Future<List<LoginModel>> logingUser(String militarySerialNumber, String password) async {
  try{
  final response = await post(
    Uri.parse('https://211.37.150.202:80/api/users/login'), 
    headers: {
            "Content-Type": "application/json",
          },
  body: {
    "militarySerialNumber": militarySerialNumber,
    "password": password,
    });

    List<LoginModel> loginModel = jsonDecode(response.body)
    .map<LoginModel>((item) => LoginModel.fromJson(item)).toList();
    return loginModel;

    if(response.statusCode == 200) {
      Get.to(UnitPage());
    } else {
      
    }
    
  } catch (e) {
    print(e.toString());
  }
}
