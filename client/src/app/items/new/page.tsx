'use client';

import { ItemForm } from '@/components/ItemForm';
import { useRouter } from 'next/navigation';

export default function NewItem() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Item</h1>
      <div className="max-w-2xl">
        <ItemForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 