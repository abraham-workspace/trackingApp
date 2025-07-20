import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart'; // import dotenv
import 'package:track/home.dart';
import 'package:track/login.dart';
import 'package:track/register.dart';
import 'package:track/splash.dart'; 
import 'package:track/register_device.dart';
import 'package:track/report.dart';

Future<void> main() async {
  // Load .env file before running the app
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrackSmart',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        scaffoldBackgroundColor: Colors.white,
        useMaterial3: true,
      ),
      initialRoute: '/splash', 
      routes: {
        '/splash': (context) => const SplashScreen(),   
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/home': (context) => const HomeScreen(),
        '/register_device': (context) => const RegisterDevicePage(),
        '/report': (context) => const ReportPage(),
      },
    );
  }
}
