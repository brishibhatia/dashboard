import { Item } from '../store/slices/itemsSlice';

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <span
          className={`px-2 py-1 rounded text-sm ${
            item.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {item.status}
        </span>
      </div>
      <p className="mt-2 text-gray-600">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
} 