import { Request, Response, NextFunction } from 'express';
import Item from '../models/Item';
import { createItemSchema, updateItemSchema } from '../validation/itemValidation';

export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const items = await Item.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Item.countDocuments(query);

    res.json({
      items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { error } = createItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { error } = updateItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
}; 