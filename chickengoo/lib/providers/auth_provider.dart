import 'package:flutter/foundation.dart';
import '../models/user.dart';
import '../models/branch.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  Branch? _selectedBranch;
  bool _isAuthenticated = false;

  User? get user => _user;
  Branch? get selectedBranch => _selectedBranch;
  bool get isAuthenticated => _isAuthenticated;

  void login(User user) {
    _user = user;
    _isAuthenticated = true;
    notifyListeners();
  }

  void logout() {
    _user = null;
    _selectedBranch = null;
    _isAuthenticated = false;
    notifyListeners();
  }

  void selectBranch(Branch branch) {
    _selectedBranch = branch;
    notifyListeners();
  }

  void updateUser(User user) {
    _user = user;
    notifyListeners();
  }
}

