import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppConstants {
  static String get mapboxAccessToken => dotenv.env['MAPBOX_ACCESS_TOKEN'] ?? '';
  static String get openCageApiKey => dotenv.env['OPENCAGE_API_KEY'] ?? '';
  // Use 10.0.2.2 for Android emulator, localhost for iOS/Web, or IP for physical device
  static String get baseUrl => dotenv.env['BASE_URL'] ?? 'http://192.168.2.42:5001/api'; 
}
