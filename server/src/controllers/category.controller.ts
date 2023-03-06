import { Request, Response } from 'express';
import { Category, CategoryInput } from '../models/category.model';
import slugify from 'react-slugify';
export const getCategories = async (req: Request, res: Response) => {
    await Category
        .find({ published: true })
        .exec()
        .then(categories => {
            if (!categories) {
                res.status(404).send({
                    message: `Not found categories.`
                });
            }
            else {
                res.status(201).json({ categories });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

export const createCategory = async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
        return res.status(422).json({ message: 'The fields title are required.' });
    }
    
    const categoryInput: CategoryInput = {
        title,
        slug: slugify(title)
    };
    await Category.create(categoryInput)
        .then(category => {
            if (!category) {
                res.status(404).send({
                    message: `Cannot create category.`
                });
            } else {
                res.status(200).json({ category });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

export const updateCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, slug, } = req.body;
    if (!title || !slug || !slug) {
        return res.status(422).json({ message: 'The fields title and slug are required.' });
    };
    const categoryInput: CategoryInput = {
        title,
        slug
    };
    await Category.findByIdAndUpdate(id, categoryInput)
        .then(category => {
            if (!category) {
                res.status(404).send({
                    message: `Cannot update Category` + category
                });
            } else {
                res.json({ category });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

export const deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id;
    await Category.findByIdAndRemove(id)
        .then(category => {
            if (!category) {
                res.status(404).send({
                    message: `Cannot delete Category with id=${id}.`
                });
            } else {
                res.send({
                    message: "Category was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}