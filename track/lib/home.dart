import 'package:flutter/material.dart';
import 'package:track/register_device.dart';
import 'package:track/report.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    // Home Dashboard
    _DashboardView(),

    // Register Device
    const RegisterDevicePage(),

    // Track Page Placeholder
    Center(child: Text("Track Page", style: TextStyle(fontSize: 18))),

    // Report Page
    const ReportPage(),

    // Settings Page Placeholder
    Center(child: Text("Settings Page", style: TextStyle(fontSize: 18))),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  PreferredSizeWidget? _buildAppBar() {
    if (_selectedIndex == 0) {
      return AppBar(
        backgroundColor: const Color(0xFF495057),
        title: const Text('Dashboard'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // Search logic
            },
          ),
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {
              // Notification logic
            },
          ),
        ],
      );
    }
    return null; // No AppBar for other pages
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        selectedItemColor: const Color(0xFF667eea),
        unselectedItemColor: Colors.grey,
        backgroundColor: Colors.white,
        onTap: _onItemTapped,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.add_box), label: 'Register Device'),
          BottomNavigationBarItem(icon: Icon(Icons.gps_fixed), label: 'Track'),
          BottomNavigationBarItem(icon: Icon(Icons.report), label: 'Reports'),
          BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
        ],
      ),
    );
  }
}

class _DashboardView extends StatelessWidget {
  const _DashboardView();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          colors: [Color(0xFFf8f9fa), Color(0xFFe9ecef)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),
      child: ListView(
        children: [
          _buildStatGrid(),
          const SizedBox(height: 20),
          _buildDeviceCard("iPhone 14 Pro", "Online", "2 hours ago", Icons.smartphone),
          _buildDeviceCard("MacBook Air", "Lost", "5 minutes ago", Icons.laptop_mac),
          _buildDeviceCard("AirPods Pro", "Offline", "1 day ago", Icons.headphones),
        ],
      ),
    );
  }

  Widget _buildStatGrid() {
    return GridView.count(
      crossAxisCount: 2,
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: const [
        StatCard(label: "Registered Devices", value: "8"),
        StatCard(label: "Currently Lost", value: "2"),
        StatCard(label: "Times Found", value: "15"),
        StatCard(label: "Success Rate", value: "95%"),
      ],
    );
  }

  Widget _buildDeviceCard(String name, String status, String lastSeen, IconData icon) {
    Color bgColor;
    Color textColor;

    switch (status) {
      case "Online":
        bgColor = const Color(0xFFD4EDDA);
        textColor = const Color(0xFF155724);
        break;
      case "Offline":
        bgColor = const Color(0xFFF8D7DA);
        textColor = const Color(0xFF721C24);
        break;
      case "Lost":
        bgColor = const Color(0xFFFFF3CD);
        textColor = const Color(0xFF856404);
        break;
      default:
        bgColor = Colors.grey.shade300;
        textColor = Colors.black;
    }

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      margin: const EdgeInsets.only(bottom: 16),
      child: ListTile(
        contentPadding: const EdgeInsets.all(16),
        leading: CircleAvatar(
          radius: 24,
          backgroundColor: const Color(0xFF667eea),
          child: Icon(icon, color: Colors.white),
        ),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text("Last seen: $lastSeen"),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(20),
          ),
          child: Text(status, style: TextStyle(color: textColor, fontSize: 12, fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }
}

class StatCard extends StatelessWidget {
  final String label;
  final String value;

  const StatCard({super.key, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 8)],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(value, style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Color(0xFF667eea))),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(color: Color(0xFF6c757d))),
        ],
      ),
    );
  }
}
