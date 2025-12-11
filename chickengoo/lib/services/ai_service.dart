import 'dart:convert';
import 'package:google_generative_ai/google_generative_ai.dart';
import '../models/product.dart';
import '../models/combo.dart';
import '../constants.dart';

class AIService {
  // Use a placeholder key if not provided. 
  // Ideally, this should be in .env, but for now we'll use a hardcoded one or prompt user.
  // Since I cannot ask user for key interactively easily, I will use a const from AppConstants
  // or a default one if I had one. For now, I'll rely on AppConstants having it or user adding it.
  static const String _apiKey = 'YOUR_API_KEY'; // TODO: Replace with actual key or load from env

  late final GenerativeModel _model;
  late final ChatSession _chat;

  AIService() {
    // We will use the 'gemini-flash-latest' model
    _model = GenerativeModel(
      model: 'gemini-flash-latest',
      apiKey: AppConstants.geminiApiKey.isNotEmpty ? AppConstants.geminiApiKey : _apiKey,
    );
    _chat = _model.startChat();
  }

  Future<AIResponse> sendMessage(String userMessage, List<Product> products, List<Combo> combos) async {
    // Construct context
    final productList = products.map((p) => '- ${p.name} (${p.price} VND): ${p.desc ?? ""}').join('\n');
    final comboList = combos.map((c) => '- ${c.name} (${c.price} VND): ${c.desc ?? ""}').join('\n');
    
    final prompt = '''
    You are a helpful AI assistant for a food delivery app called "ChickenGoo".
    
    Here is the current menu:
    Products:
    $productList
    
    Combos:
    $comboList
    
    User says: "$userMessage"
    
    Your goal is to suggest a meal based on the user's budget and preferences.
    
    If the user asks for a recommendation, you MUST return a JSON object in the following format inside a code block:
    ```json
    {
      "text": "Your friendly response here...",
      "suggestedItems": [
        { "type": "product", "id": 123 },
        { "type": "combo", "id": 456 }
      ]
    }
    ```
    
    If the user is just chatting or asking general questions, just return plain text.
    
    Keep your response short, friendly, and helpful. Use Vietnamese.
    ''';

    try {
      // Mock response if key is missing or placeholder
      if (AppConstants.geminiApiKey.isEmpty || AppConstants.geminiApiKey == 'YOUR_API_KEY') {
        await Future.delayed(const Duration(seconds: 1)); // Simulate network delay
        return AIResponse(
          text: "Đây là phản hồi mẫu (do chưa có API Key). Tôi thấy bạn có 50k, tôi gợi ý Combo 1 nhé!",
          suggestedItems: [SuggestedItem(type: 'combo', id: 1)],
        );
      }

      final response = await _chat.sendMessage(Content.text(prompt));
      final text = response.text;
      
      if (text == null) return AIResponse(text: "Xin lỗi, tôi không hiểu ý bạn.");

      // Check for JSON block
      String? jsonStr;
      
      // Try to find JSON inside code blocks
      final jsonBlockMatch = RegExp(r'```(?:json)?\s*(\{.*?\})\s*```', dotAll: true).firstMatch(text);
      if (jsonBlockMatch != null) {
        jsonStr = jsonBlockMatch.group(1);
      } else {
        // Try to find raw JSON object if no code blocks
        final rawJsonMatch = RegExp(r'(\{[\s\S]*"suggestedItems"[\s\S]*\})', dotAll: true).firstMatch(text);
        if (rawJsonMatch != null) {
          jsonStr = rawJsonMatch.group(1);
        }
      }

      if (jsonStr != null) {
        try {
          final data = json.decode(jsonStr);
          return AIResponse(
            text: data['text'] ?? text, // Fallback to full text if 'text' field missing
            suggestedItems: (data['suggestedItems'] as List?)?.map((item) => SuggestedItem.fromJson(item)).toList(),
          );
        } catch (e) {
          print('Error parsing AI JSON: $e');
        }
      }

      return AIResponse(text: text);
    } catch (e) {
      return AIResponse(text: "Xin lỗi, đã có lỗi xảy ra: $e");
    }
  }
}

class AIResponse {
  final String text;
  final List<SuggestedItem>? suggestedItems;

  AIResponse({required this.text, this.suggestedItems});
}

class SuggestedItem {
  final String type; // 'product' or 'combo'
  final int id;

  SuggestedItem({required this.type, required this.id});

  factory SuggestedItem.fromJson(Map<String, dynamic> json) {
    return SuggestedItem(
      type: json['type'],
      id: json['id'],
    );
  }
}
