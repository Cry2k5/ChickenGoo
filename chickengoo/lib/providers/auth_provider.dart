import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../models/branch.dart';

import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  Branch? _selectedBranch;
  bool _isAuthenticated = false;
  final ApiService _apiService = ApiService();

  User? get user => _user;
  String? get token => _token;
  Branch? get selectedBranch => _selectedBranch;
  bool get isAuthenticated => _isAuthenticated;

  Future<void> login(String phone, String password) async {
    try {
      final data = await _apiService.login(phone, password);
      _user = User.fromJson(data['user']);
      _token = data['token'];
      _isAuthenticated = true;
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> register(String name, String phone, String email, String password) async {
    try {
      final data = await _apiService.register(name, phone, email, password);
      _user = User.fromJson(data['user']);
      _token = data['token'];
      _isAuthenticated = true;
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  void logout() {
    _user = null;
    _token = null;
    _selectedBranch = null;
    _isAuthenticated = false;
    notifyListeners();
  }

  Future<void> selectBranch(Branch branch) async {
    print('DEBUG: AuthProvider.selectBranch called for branch: ${branch.name}');
    _selectedBranch = branch;
    notifyListeners();
    print('DEBUG: AuthProvider.selectBranch - notifyListeners called');
    
    // Create cart for this branch if user is authenticated
    if (_isAuthenticated && _token != null) {
      print('DEBUG: AuthProvider.selectBranch - User is authenticated, creating cart...');
      try {
        await _apiService.createCart(branch.id, _token!);
        print('DEBUG: AuthProvider.selectBranch - Cart created successfully');
      } catch (e) {
        // Cart might already exist, that's okay
        print('DEBUG: AuthProvider.selectBranch - Cart creation failed (might already exist): ${e.toString()}');
      }
      
      // Load existing cart items
      // We need context to access CartProvider, but AuthProvider doesn't have context.
      // So we will rely on the UI (MainScreen) or just expose a method to load cart.
      // Actually, we can't easily access CartProvider here without context.
      // Better approach: MainScreen listens to AuthProvider and calls CartProvider.loadCart
    } else {
      print('DEBUG: AuthProvider.selectBranch - User NOT authenticated or token null');
    }
  }

  void clearBranch() {
    _selectedBranch = null;
    notifyListeners();
  }

  void updateUser(User user) {
    _user = user;
    notifyListeners();
  }
}

