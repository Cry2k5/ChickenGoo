import { useState } from "react";
import { Search, Plus, MoreVertical, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import ComboDialog from "../components/dialogs/ComboDialog";

// Mock products - trong thực tế sẽ lấy từ API hoặc context
const mockProducts = [
  { id: 1, name: "Gà rán giòn cay", price: 89000, image: "https://via.placeholder.com/400" },
  { id: 2, name: "Gà rán không cay", price: 89000, image: "https://via.placeholder.com/400" },
  { id: 3, name: "Khoai tây chiên", price: 45000, image: "https://via.placeholder.com/400" },
  { id: 4, name: "Coca Cola", price: 25000, image: "https://via.placeholder.com/400" },
  { id: 5, name: "Pepsi", price: 25000, image: "https://via.placeholder.com/400" },
  { id: 6, name: "Kem vani", price: 35000, image: "https://via.placeholder.com/400" },
  { id: 7, name: "Gà rán sốt BBQ", price: 95000, image: "https://via.placeholder.com/400" },
  { id: 8, name: "Gà rán sốt mật ong", price: 98000, image: "https://via.placeholder.com/400" },
  { id: 9, name: "Cánh gà rán", price: 75000, image: "https://via.placeholder.com/400" },
  { id: 10, name: "Đùi gà rán", price: 85000, image: "https://via.placeholder.com/400" },
  { id: 11, name: "7Up", price: 25000, image: "https://via.placeholder.com/400" },
  { id: 12, name: "Sprite", price: 25000, image: "https://via.placeholder.com/400" },
  { id: 13, name: "Nước cam ép", price: 30000, image: "https://via.placeholder.com/400" },
  { id: 14, name: "Bánh mì gà", price: 35000, image: "https://via.placeholder.com/400" },
  { id: 15, name: "Salad rau củ", price: 40000, image: "https://via.placeholder.com/400" },
  { id: 16, name: "Kem chocolate", price: 35000, image: "https://via.placeholder.com/400" },
  { id: 17, name: "Kem dâu", price: 35000, image: "https://via.placeholder.com/400" },
  { id: 18, name: "Bánh flan", price: 30000, image: "https://via.placeholder.com/400" },
];

// Mock data
let mockCombos = [
  {
    id: 1,
    name: "Combo Gia Đình",
    categoryId: 2,
    category: "Combo",
    price: 199000,
    desc: "2 miếng gà rán + 2 khoai tây chiên + 2 đồ uống",
    image: "https://via.placeholder.com/400",
    comboItems: [
      { productId: 1, productName: "Gà rán giòn cay", quantity: 2 },
      { productId: 3, productName: "Khoai tây chiên", quantity: 2 },
      { productId: 4, productName: "Coca Cola", quantity: 2 },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Combo Đôi",
    categoryId: 2,
    category: "Combo",
    price: 149000,
    desc: "2 miếng gà rán + 1 khoai tây chiên + 2 đồ uống",
    image: "https://via.placeholder.com/400",
    comboItems: [
      { productId: 2, productName: "Gà rán không cay", quantity: 2 },
      { productId: 3, productName: "Khoai tây chiên", quantity: 1 },
      { productId: 5, productName: "Pepsi", quantity: 2 },
    ],
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Combo Cá Nhân",
    categoryId: 2,
    category: "Combo",
    price: 99000,
    desc: "1 miếng gà rán + 1 khoai tây chiên + 1 đồ uống",
    image: "https://via.placeholder.com/400",
    comboItems: [
      { productId: 1, productName: "Gà rán giòn cay", quantity: 1 },
      { productId: 3, productName: "Khoai tây chiên", quantity: 1 },
      { productId: 4, productName: "Coca Cola", quantity: 1 },
    ],
    createdAt: "2024-01-17",
  },
];

// Mock categories
const mockCategories = [
  { id: 1, name: "Gà rán" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Đồ uống" },
  { id: 4, name: "Món phụ" },
  { id: 5, name: "Tráng miệng" },
];

export default function Combos() {
  const [combos, setCombos] = useState(mockCombos);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [comboToDelete, setComboToDelete] = useState(null);

  const filteredCombos = combos.filter(
    (combo) =>
      combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (combo.category &&
        combo.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAdd = () => {
    setSelectedCombo(null);
    setDialogOpen(true);
  };

  const handleEdit = (combo) => {
    setSelectedCombo(combo);
    setDialogOpen(true);
  };

  const handleDelete = (combo) => {
    setComboToDelete(combo);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (comboToDelete) {
      setCombos(combos.filter((c) => c.id !== comboToDelete.id));
      setDeleteDialogOpen(false);
      setComboToDelete(null);
    }
  };

  const handleSave = (comboData) => {
    const category = mockCategories.find(
      (c) => c.id === parseInt(comboData.categoryId)
    );
    if (comboData.id) {
      setCombos(
        combos.map((c) =>
          c.id === comboData.id
            ? {
                ...c,
                ...comboData,
                price: parseInt(comboData.price),
                category: category?.name || "",
              }
            : c
        )
      );
    } else {
      const newCombo = {
        ...comboData,
        id: Math.max(...combos.map((c) => c.id), 0) + 1,
        price: parseInt(comboData.price),
        category: category?.name || "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCombos([...combos, newCombo]);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Combo</h1>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">
            Quản lý các combo sản phẩm
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>Thêm combo</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm combo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Combos Grid */}
      {filteredCombos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Không tìm thấy combo nào</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredCombos.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group"
            >
              <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {combo.image ? (
                  <img
                    src={combo.image}
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ImageIcon size={48} className="text-gray-400" />
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                        <MoreVertical size={18} className="text-gray-600" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item
                          onClick={() => handleEdit(combo)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none"
                        >
                          <Edit size={16} />
                          Chỉnh sửa
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          onClick={() => handleDelete(combo)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                        >
                          <Trash2 size={16} />
                          Xóa
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {combo.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{combo.category}</p>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(combo.price)}
                  </p>
                  {combo.desc && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {combo.desc}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Combo Dialog */}
      <ComboDialog
        key={selectedCombo?.id || "new"}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedCombo(null);
        }}
        combo={selectedCombo}
        categories={mockCategories}
        products={mockProducts}
        onSave={handleSave}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md z-50 p-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-4">
              Xác nhận xóa
            </Dialog.Title>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa combo{" "}
              <strong>{comboToDelete?.name}</strong>? Hành động này không thể
              hoàn tác.
            </p>
            <div className="flex gap-3">
              <Dialog.Close asChild>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
              </Dialog.Close>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

