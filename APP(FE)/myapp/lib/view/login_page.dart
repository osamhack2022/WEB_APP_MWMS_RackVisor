import 'dart:html';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';
import 'package:myapp/utils/global_colors.dart';
import '../model/login_model.dart';
import '../services/login_service.dart';
import '../utils/constants.dart';

class LoginPage extends StatefulWidget {

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  String message = ''; 


  LoginModel? loginModel;

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    ScreenUtil.init(context, designSize: const Size(896, 414));
    return Scaffold(

      body: SafeArea(
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(children: [

              SizedBox(
                width: MediaQuery.of(context).size.width * 0.8,
                height: 195,
                child: Image.asset(
                  'images/main_logo.png',
                  fit: BoxFit.scaleDown,
                ),
              ),

              // 국방물자관리체계
              Text(
                '국방물자관리체계',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 36.sp,
                ),
              ),

              const SizedBox(height: 10),

              // 소개글
              Text(                                                         
                "Military Warehouse \n Management System",
                style: TextStyle(
                  fontSize: 24.sp,
                ),
              ),

              const SizedBox(height: 40),

              // 군번 입력필드
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: GlobalColors.loginBorder,
                    border: Border.all(color: Colors.white),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    // 입력값 왼쪽 띄우기
                    padding: const EdgeInsets.only(left: 20.0),

                    child: TextFormField(
                      
                      style: const TextStyle(color: Color(0xFF373737)),
                      controller: emailController,
                      onSaved: (input) => loginModel?.militarySerialNumber = input!,

                      validator: (value) {
                        if(value!.isEmpty) {
                          return '군번을 입력하세요';
                        }
                        return null;
                      },


                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        hintText: '군번을 입력하세요',
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 10),

              // 비밀번호 입력필드
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: GlobalColors.loginBorder,
                    border: Border.all(color: Colors.white),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Padding(
                    // 입력값 왼쪽 띄우기
                    padding: const EdgeInsets.only(left: 20.0),
                    child: TextFormField(
                      style: const TextStyle(color: Color(0xFF373737)),
                      onSaved: (input) => loginModel?.password = input!,
                      controller: passwordController,
                      validator: (value) {
                        if(value!.isEmpty) {
                          return '군번을 입력하세요';
                        }
                        return null;
                      },

                      // 비밀번호 숨기기
                      obscureText: true,
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        hintText: '비밀번호를 입력하세요',
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 10),

              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25.0),
                child: GestureDetector(
                  onTap: () async { 
                    logingUser(emailController.text.toString(), passwordController.text.toString());
                  },
                  child: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: kAccentColor,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Text(
                        'sign in',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 25),

              // 회원가입 부분
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Text(
                    '회원이 아니시라면 웹에서 회원가입을 진행해주세요.',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ]),
          ),
        ),
      ),
    );


  }
}
