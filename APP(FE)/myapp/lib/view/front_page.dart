import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:myapp/controller/bottom_nav_controller.dart';
import 'package:stylish_bottom_bar/stylish_bottom_bar.dart';


class FrontPage extends StatefulWidget {
  const FrontPage({
    Key? key,
  }) : super(key: key);

@override
  State<FrontPage> createState() => _FrontPage();
}

 
class _FrontPage extends State<FrontPage> {
  BottomNavigationBarController c = Get.put(BottomNavigationBarController());
  
  @override
  void dispose() {
    c.dispose();
    super.dispose();
  }
 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      appBar: AppBar(title: const Text("start"),),
      bottomNavigationBar: StylishBottomBar(
        items: [
          AnimatedBarItems(
              icon: const Icon(
                Icons.house_outlined,
              ),
              selectedIcon: const Icon(Icons.house_rounded),
              selectedColor: Colors.teal,
              backgroundColor: Colors.tealAccent,
              title: const Text('Home')),
          AnimatedBarItems(
              icon: const Icon(Icons.star_border_rounded),
              selectedIcon: const Icon(Icons.star_rounded),
              selectedColor: Colors.green,
              backgroundColor: Colors.lightGreenAccent,
              title: const Text('Star')),
          AnimatedBarItems(
              icon: const Icon(
                Icons.style_outlined,
              ),
              selectedIcon: const Icon(
                Icons.style,
              ),
              backgroundColor: Colors.amber,
              selectedColor: Colors.deepOrangeAccent,
              title: const Text('Style')),
          AnimatedBarItems(
              icon: const Icon(
                Icons.person_outline,
              ),
              selectedIcon: const Icon(
                Icons.person,
              ),
              backgroundColor: Colors.purpleAccent,
              selectedColor: Colors.deepPurple,
              title: const Text('Profile')),
        ],
        iconSize: 32,
        barAnimation: BarAnimation.drop,
        iconStyle: IconStyle.animated,
        hasNotch: true,
        fabLocation: StylishBarFabLocation.end,
        opacity: 0.3,
        currentIndex: c.selected ?? 0,
        onTap: (index) {
          c.controller.jumpToPage(index!);
          setState(() {
            c.selected = index;
          });
        },
      ),

      body: PageView(
        controller: c.controller,
        children: const [
            Center(child: Text('Home')),
            Center(child: Text('Star')),
            Center(child: Text('Add')), 
            Center(child: Text('Style')),
          ],
      ),
    );
  }
}
