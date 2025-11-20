import 'package:flutter/foundation.dart';
import '../models/product.dart';
import '../models/combo.dart';
import '../models/order.dart';

class CartItem {
  final Product? product;
  final Combo? combo;
  int quantity;

  CartItem({
    this.product,
    this.combo,
    this.quantity = 1,
  }) : assert(product != null || combo != null);

  int get price => (product?.price ?? combo?.price ?? 0);
  int get totalPrice => price * quantity;
  String get name => product?.name ?? combo?.name ?? '';
  String? get image => product?.image ?? combo?.image;
}

class CartProvider with ChangeNotifier {
  final List<CartItem> _items = [];
  final List<Order> _orders = [];

  List<CartItem> get items => _items;
  List<Order> get orders => _orders;

  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  int get totalAmount => _items.fold(0, (sum, item) => sum + item.totalPrice);

  bool get isEmpty => _items.isEmpty;

  void addProduct(Product product, {int quantity = 1}) {
    final existingIndex = _items.indexWhere(
      (i) => i.product?.id == product.id && i.combo == null,
    );

    if (existingIndex >= 0) {
      _items[existingIndex].quantity += quantity;
    } else {
      _items.add(CartItem(product: product, quantity: quantity));
    }
    notifyListeners();
  }

  void addCombo(Combo combo, {int quantity = 1}) {
    final existingIndex = _items.indexWhere(
      (i) => i.combo?.id == combo.id && i.product == null,
    );

    if (existingIndex >= 0) {
      _items[existingIndex].quantity += quantity;
    } else {
      _items.add(CartItem(combo: combo, quantity: quantity));
    }
    notifyListeners();
  }

  void removeItem(int index) {
    if (index >= 0 && index < _items.length) {
      _items.removeAt(index);
      notifyListeners();
    }
  }

  void updateQuantity(int index, int quantity) {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }

    if (index >= 0 && index < _items.length) {
      _items[index].quantity = quantity;
      notifyListeners();
    }
  }

  void clear() {
    _items.clear();
    notifyListeners();
  }

  void addOrder(Order order) {
    _orders.insert(0, order);
    notifyListeners();
  }
}
