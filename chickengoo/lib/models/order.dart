import 'product.dart';
import 'combo.dart';

enum OrderStatus {
  pending,
  preparing,
  ready,
  completed,
  cancelled,
}

class Order {
  final int id;
  final int userId;
  final int branchId;
  final int totalAmount;
  final OrderStatus status;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.userId,
    required this.branchId,
    required this.totalAmount,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    required this.items,
  });

  String get statusText {
    switch (status) {
      case OrderStatus.pending:
        return 'Chờ xử lý';
      case OrderStatus.preparing:
        return 'Đang chuẩn bị';
      case OrderStatus.ready:
        return 'Sẵn sàng';
      case OrderStatus.completed:
        return 'Hoàn thành';
      case OrderStatus.cancelled:
        return 'Đã hủy';
    }
  }

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      userId: json['userId'],
      branchId: json['branchId'],
      totalAmount: json['totalAmount'],
      status: OrderStatus.values.firstWhere(
        (e) => e.toString().split('.').last == json['status'],
        orElse: () => OrderStatus.pending,
      ),
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      items: (json['items'] as List?)
              ?.map((e) => OrderItem.fromJson(e))
              .toList() ??
          [],
    );
  }
}

class OrderItem {
  final int id;
  final int orderId;
  final int? productId;
  final int? comboId;
  final int quantity;
  final int price;
  final Product? product;
  final Combo? combo;

  OrderItem({
    required this.id,
    required this.orderId,
    this.productId,
    this.comboId,
    required this.quantity,
    required this.price,
    this.product,
    this.combo,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id'],
      orderId: json['orderId'],
      productId: json['productId'],
      comboId: json['comboId'],
      quantity: json['quantity'],
      price: json['price'],
      product: json['product'] != null
          ? Product.fromJson(json['product'])
          : null,
      combo: json['combo'] != null ? Combo.fromJson(json['combo']) : null,
    );
  }
}
