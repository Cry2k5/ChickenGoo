import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import ProductDialog from "../components/dialogs/ProductDialog";
import Pagination from "../components/Pagination";

// Mock data - trong thực tế sẽ lấy từ API
let mockProducts = [
  {
    id: 1,
    name: "Gà rán giòn cay",
    categoryId: 1,
    category: "Gà rán",
    price: 89000,
    desc: "Gà rán giòn cay đậm đà, thơm ngon",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Gà rán không cay",
    categoryId: 1,
    category: "Gà rán",
    price: 89000,
    desc: "Gà rán giòn, không cay, phù hợp mọi lứa tuổi",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-16",
  },
  {
    id: 3,
    name: "Khoai tây chiên",
    categoryId: 4,
    category: "Món phụ",
    price: 45000,
    desc: "Khoai tây chiên giòn, nóng hổi",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-17",
  },
  {
    id: 4,
    name: "Coca Cola",
    categoryId: 3,
    category: "Đồ uống",
    price: 25000,
    desc: "Nước ngọt có ga",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-18",
  },
  {
    id: 5,
    name: "Pepsi",
    categoryId: 3,
    category: "Đồ uống",
    price: 25000,
    desc: "Nước ngọt có ga",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-19",
  },
  {
    id: 6,
    name: "Kem vani",
    categoryId: 5,
    category: "Tráng miệng",
    price: 35000,
    desc: "Kem vani mát lạnh",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-20",
  },
  {
    id: 7,
    name: "Gà rán sốt BBQ",
    categoryId: 1,
    category: "Gà rán",
    price: 95000,
    desc: "Gà rán sốt BBQ thơm ngon",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-21",
  },
  {
    id: 8,
    name: "Gà rán sốt mật ong",
    categoryId: 1,
    category: "Gà rán",
    price: 98000,
    desc: "Gà rán sốt mật ong ngọt ngào",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-22",
  },
  {
    id: 9,
    name: "Cánh gà rán",
    categoryId: 1,
    category: "Gà rán",
    price: 75000,
    desc: "Cánh gà rán giòn",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-23",
  },
  {
    id: 10,
    name: "Đùi gà rán",
    categoryId: 1,
    category: "Gà rán",
    price: 85000,
    desc: "Đùi gà rán thơm ngon",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-24",
  },
  {
    id: 11,
    name: "7Up",
    categoryId: 3,
    category: "Đồ uống",
    price: 25000,
    desc: "Nước ngọt có ga",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-25",
  },
  {
    id: 12,
    name: "Sprite",
    categoryId: 3,
    category: "Đồ uống",
    price: 25000,
    desc: "Nước ngọt có ga",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-26",
  },
  {
    id: 13,
    name: "Nước cam ép",
    categoryId: 3,
    category: "Đồ uống",
    price: 30000,
    desc: "Nước cam ép tươi",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-27",
  },
  {
    id: 14,
    name: "Bánh mì gà",
    categoryId: 4,
    category: "Món phụ",
    price: 35000,
    desc: "Bánh mì gà thơm ngon",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-28",
  },
  {
    id: 15,
    name: "Salad rau củ",
    categoryId: 4,
    category: "Món phụ",
    price: 40000,
    desc: "Salad rau củ tươi ngon",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-29",
  },
  {
    id: 16,
    name: "Kem chocolate",
    categoryId: 5,
    category: "Tráng miệng",
    price: 35000,
    desc: "Kem chocolate đậm đà",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-01-30",
  },
  {
    id: 17,
    name: "Kem dâu",
    categoryId: 5,
    category: "Tráng miệng",
    price: 35000,
    desc: "Kem dâu tươi mát",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-02-01",
  },
  {
    id: 18,
    name: "Bánh flan",
    categoryId: 5,
    category: "Tráng miệng",
    price: 30000,
    desc: "Bánh flan mềm mịn",
    image: "https://via.placeholder.com/400",
    createdAt: "2024-02-02",
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

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const validPage =
    currentPage > totalPages && totalPages > 0 ? 1 : currentPage;
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAdd = () => {
    setSelectedProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleSave = (productData) => {
    const category = mockCategories.find(
      (c) => c.id === parseInt(productData.categoryId)
    );
    if (productData.id) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === productData.id
            ? {
                ...p,
                ...productData,
                price: parseInt(productData.price),
                category: category?.name || "",
              }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        price: parseInt(productData.price),
        category: category?.name || "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts([...products, newProduct]);
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
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Món ăn
          </h1>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">
            Quản lý tất cả món ăn trong nhà hàng
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          <span>Thêm món ăn</span>
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
            placeholder="Tìm kiếm món ăn..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên món ăn
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Danh mục
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Giá
                </th>
                <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 lg:px-6 py-12 text-center text-gray-500"
                  >
                    Không tìm thấy món ăn nào
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={20} className="text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        {product.desc && (
                          <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {product.desc}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(product.price)}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical size={18} className="text-gray-600" />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[180px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50"
                            sideOffset={5}
                          >
                            <DropdownMenu.Item
                              onClick={() => handleEdit(product)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer outline-none"
                            >
                              <Edit size={16} />
                              Chỉnh sửa
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              onClick={() => handleDelete(product)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer outline-none"
                            >
                              <Trash2 size={16} />
                              Xóa
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={validPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
          />
        )}
      </div>

      {/* Product Dialog */}
      <ProductDialog
        key={selectedProduct?.id || "new"}
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={mockCategories}
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
              Bạn có chắc chắn muốn xóa món ăn{" "}
              <strong>{productToDelete?.name}</strong>? Hành động này không thể
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
