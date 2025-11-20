import '../models/category.dart';
import '../models/product.dart';
import '../models/combo.dart';
import '../models/branch.dart';
import '../models/notification.dart';

class FakeDataService {
  static final FakeDataService _instance = FakeDataService._internal();
  factory FakeDataService() => _instance;
  FakeDataService._internal();

  // Categories
  List<Category> getCategories() {
    return [
      Category(id: 1, name: 'Gà Rán'),
      Category(id: 2, name: 'Burger'),
      Category(id: 3, name: 'Combo'),
      Category(id: 4, name: 'Đồ Uống'),
      Category(id: 5, name: 'Món Phụ'),
    ];
  }

  // Products
  List<Product> getProducts() {
    final categories = getCategories();
    return [
      Product(
        id: 1,
        categoryId: 1,
        category: categories[0],
        name: 'Gà Rán Giòn 2 Miếng',
        price: 69000,
        desc: '2 miếng đùi gà rán giòn, thơm ngon, đậm đà',
        image: '🍗',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 2,
        categoryId: 1,
        category: categories[0],
        name: 'Gà Rán Giòn 3 Miếng',
        price: 99000,
        desc: '3 miếng đùi gà rán giòn, thơm ngon, đậm đà',
        image: '🍗',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 3,
        categoryId: 1,
        category: categories[0],
        name: 'Gà Rán Không Xương',
        price: 79000,
        desc: 'Gà rán không xương, giòn bên ngoài, mềm bên trong',
        image: '🍗',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 4,
        categoryId: 2,
        category: categories[1],
        name: 'Burger Gà Giòn',
        price: 89000,
        desc: 'Burger với gà rán giòn, rau tươi, sốt đặc biệt',
        image: '🍔',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 5,
        categoryId: 2,
        category: categories[1],
        name: 'Burger Gà Phô Mai',
        price: 99000,
        desc: 'Burger gà với phô mai tan chảy, rau tươi',
        image: '🍔',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 6,
        categoryId: 4,
        category: categories[3],
        name: 'Pepsi',
        price: 25000,
        desc: 'Nước ngọt có ga Pepsi',
        image: '🥤',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 7,
        categoryId: 4,
        category: categories[3],
        name: '7Up',
        price: 25000,
        desc: 'Nước ngọt có ga 7Up',
        image: '🥤',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 8,
        categoryId: 5,
        category: categories[4],
        name: 'Khoai Tây Chiên',
        price: 35000,
        desc: 'Khoai tây chiên giòn, vàng ruộm',
        image: '🍟',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Product(
        id: 9,
        categoryId: 5,
        category: categories[4],
        name: 'Gà Viên 5 Viên',
        price: 45000,
        desc: '5 viên gà chiên giòn, thơm ngon',
        image: '🍗',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
    ];
  }

  // Combos
  List<Combo> getCombos() {
    final categories = getCategories();
    final products = getProducts();
    return [
      Combo(
        id: 1,
        categoryId: 3,
        category: categories[2],
        name: 'Combo Gà Rán 2 Miếng',
        price: 109000,
        desc: '2 miếng gà rán + Khoai tây chiên + Pepsi',
        image: '🍱',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        comboItems: [
          ComboItem(
            id: 1,
            comboId: 1,
            productId: 1,
            quantity: 1,
            product: products[0],
          ),
          ComboItem(
            id: 2,
            comboId: 1,
            productId: 8,
            quantity: 1,
            product: products[7],
          ),
          ComboItem(
            id: 3,
            comboId: 1,
            productId: 6,
            quantity: 1,
            product: products[5],
          ),
        ],
      ),
      Combo(
        id: 2,
        categoryId: 3,
        category: categories[2],
        name: 'Combo Gà Rán 3 Miếng',
        price: 139000,
        desc: '3 miếng gà rán + Khoai tây chiên + Pepsi',
        image: '🍱',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        comboItems: [
          ComboItem(
            id: 4,
            comboId: 2,
            productId: 2,
            quantity: 1,
            product: products[1],
          ),
          ComboItem(
            id: 5,
            comboId: 2,
            productId: 8,
            quantity: 1,
            product: products[7],
          ),
          ComboItem(
            id: 6,
            comboId: 2,
            productId: 6,
            quantity: 1,
            product: products[5],
          ),
        ],
      ),
      Combo(
        id: 3,
        categoryId: 3,
        category: categories[2],
        name: 'Combo Gia Đình',
        price: 249000,
        desc: '6 miếng gà rán + 2 Khoai tây chiên + 2 Pepsi',
        image: '🍱',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
        comboItems: [
          ComboItem(
            id: 7,
            comboId: 3,
            productId: 1,
            quantity: 3,
            product: products[0],
          ),
          ComboItem(
            id: 8,
            comboId: 3,
            productId: 8,
            quantity: 2,
            product: products[7],
          ),
          ComboItem(
            id: 9,
            comboId: 3,
            productId: 6,
            quantity: 2,
            product: products[5],
          ),
        ],
      ),
    ];
  }

  // Branches
  List<Branch> getBranches() {
    return [
      Branch(
        id: 1,
        userId: 1,
        name: 'Chi nhánh Quận 1',
        phone: '0901234567',
        address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Branch(
        id: 2,
        userId: 2,
        name: 'Chi nhánh Quận 3',
        phone: '0901234568',
        address: '456 Lê Văn Sỹ, Quận 3, TP.HCM',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
      Branch(
        id: 3,
        userId: 3,
        name: 'Chi nhánh Quận 7',
        phone: '0901234569',
        address: '789 Nguyễn Văn Linh, Quận 7, TP.HCM',
        createdAt: DateTime.now(),
        updatedAt: DateTime.now(),
      ),
    ];
  }

  // Notifications
  List<Notification> getNotifications() {
    return [
      Notification(
        id: 1,
        title: 'Đơn hàng đã được xác nhận',
        message: 'Đơn hàng #123456 của bạn đã được xác nhận và đang được chuẩn bị',
        createdAt: DateTime.now().subtract(const Duration(hours: 2)),
        isRead: false,
      ),
      Notification(
        id: 2,
        title: 'Khuyến mãi đặc biệt',
        message: 'Giảm 20% cho tất cả combo trong tuần này!',
        createdAt: DateTime.now().subtract(const Duration(days: 1)),
        isRead: false,
      ),
      Notification(
        id: 3,
        title: 'Đơn hàng đã sẵn sàng',
        message: 'Đơn hàng #123455 của bạn đã sẵn sàng để lấy',
        createdAt: DateTime.now().subtract(const Duration(days: 2)),
        isRead: true,
      ),
    ];
  }

  // Best selling products (top 3)
  List<Product> getBestSellingProducts() {
    final products = getProducts();
    return [products[0], products[3], products[1]]; // Top 3
  }

  List<Product> getProductsByCategory(int categoryId) {
    return getProducts().where((p) => p.categoryId == categoryId).toList();
  }

  List<Combo> getCombosByCategory(int categoryId) {
    return getCombos().where((c) => c.categoryId == categoryId).toList();
  }
}
