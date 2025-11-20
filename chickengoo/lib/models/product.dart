import 'category.dart';

class Product {
  final int id;
  final int categoryId;
  final Category category;
  final String name;
  final int price;
  final String? desc;
  final String? image;
  final DateTime createdAt;
  final DateTime updatedAt;

  Product({
    required this.id,
    required this.categoryId,
    required this.category,
    required this.name,
    required this.price,
    this.desc,
    this.image,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      categoryId: json['categoryId'],
      category: Category.fromJson(json['category']),
      name: json['name'],
      price: json['price'],
      desc: json['desc'],
      image: json['image'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }
}
