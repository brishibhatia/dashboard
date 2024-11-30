'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchItems } from '../store/slices/itemsSlice';
import { ItemCard } from '../components/ItemCard';
import { useRouter } from 'next/navigation';
import { useDebounce } from '../hooks/useDebounce';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, pagination } = useSelector(
    (state: RootState) => state.items
  );

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(fetchItems({ page: 1, search: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

  const handleEdit = (item: any) => {
    console.log('Edit item:', item);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log('Delete item:', id);
    // Implement delete functionality
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => router.push('/items/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No items found. Try a different search or add a new item.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => dispatch(fetchItems({ page: i + 1, search: debouncedSearch }))}
              className={`px-4 py-2 rounded transition-colors ${
                pagination.page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
