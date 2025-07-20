import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:share/share.dart';

class ReportPage extends StatelessWidget {
  const ReportPage({Key? key}) : super(key: key);

  // Dummy device log
  final List<Map<String, String>> deviceLogs = const [
    {'device': 'Samsung A32', 'status': 'Recovered', 'date': '2025-07-18'},
    {'device': 'HP Laptop', 'status': 'Lost', 'date': '2025-07-16'},
    {'device': 'iPhone 13', 'status': 'Tracking', 'date': '2025-07-14'},
  ];

  void _exportReports(BuildContext context) {
    // This would trigger CSV/PDF generation (dummy logic here)
    Share.share('Report exported as PDF/CSV');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Reports"),
        backgroundColor: const Color(0xFF495057),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () => _exportReports(context),
            tooltip: 'Export Report',
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              "Device Recovery Overview",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 200, child: DeviceChart()),

            const SizedBox(height: 20),
            const Text(
              "Device Logs",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 10),
            ...deviceLogs.map((log) => Card(
                  margin: const EdgeInsets.symmetric(vertical: 5),
                  child: ListTile(
                    leading: const Icon(Icons.devices_other, color: Colors.indigo),
                    title: Text(log['device']!),
                    subtitle: Text('Status: ${log['status']}'),
                    trailing: Text(log['date']!),
                  ),
                )),
          ],
        ),
      ),
    );
  }
}

class DeviceChart extends StatelessWidget {
  const DeviceChart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PieChart(
      PieChartData(
        centerSpaceRadius: 40,
        sections: [
          PieChartSectionData(
            value: 40,
            color: Colors.green,
            title: 'Recovered\n40%',
            radius: 50,
            titleStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
          PieChartSectionData(
            value: 30,
            color: Colors.red,
            title: 'Lost\n30%',
            radius: 50,
            titleStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
          PieChartSectionData(
            value: 30,
            color: Colors.orange,
            title: 'Tracking\n30%',
            radius: 50,
            titleStyle: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
