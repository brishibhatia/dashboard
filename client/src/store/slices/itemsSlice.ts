import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Item {
  _id: string;
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ page = 1, limit = 10, search = '' }: { 
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await axios.get(
      `${API_URL}/items?page=${page}&limit=${limit}&search=${search}`,
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return response.data;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: Partial<Item>) => {
    const response = await axios.post(`${API_URL}/items`, itemData, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    });
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default itemsSlice.reducer; 