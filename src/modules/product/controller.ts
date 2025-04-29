import "reflect-metadata";
import Container from "typedi";
import { ProductService } from "./service";

import { Request, Response, NextFunction } from "express";
import { CreateProductDTO, UpdateProductDTO } from "./dto";

export class ProductController {
    private product_service = Container.get(ProductService);

    public getProductsBySearch = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { search_term = '', price_from, price_to, sort = 0, page = 1 } = req.query;

            const safeSearchTerm = typeof search_term === 'string' ? search_term : '';
            const safePriceFrom = price_from !== undefined && !isNaN(price_from) ? Number(price_from) : undefined;
            const safePriceTo = price_to !== undefined && !isNaN(price_to) ? Number(price_to) : undefined;
            const safeSort = [0, 1, 2].includes(Number(sort)) ? Number(sort) : 0;
            const safePage = Number(page) > 0 ? Number(page) : 1;

            const products = await this.product_service.getProductsBySearch(
                safeSearchTerm,
                safePriceFrom,
                safePriceTo,
                safeSort,
                safePage
            );

            return res.json({data: products, message: 'getProductsBySearch'});
        } catch (error) {
            next(error);
        }
    };

    public getProductsByIds = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { ids } = req.query;

            
            if (!Array.isArray(ids)) {
                ids = Array.isArray(ids.split(',')) ? ids.split(',') : [ids];
            }
            
            const validIds = ids
            .map(id => Number(id))
            .filter(id => Number.isInteger(id) && id > 0);
            
            if (validIds.length === 0) {
                return res.json([]);
            }

            const products = await this.product_service.getProductsByIds(validIds);

            return res.json({data: products, message: 'getProductsById'});
        } catch (error) {
            next(error);
        }
    };

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createProductData: CreateProductDTO = req.body;

            const product = await this.product_service.createProduct(createProductData);

            return res.status(201).json({data: product, message: 'createProduct'});
        } catch (error) {
            next(error);
        }
    };

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: "Invalid product ID." });
            }

            const updateProductData: UpdateProductDTO = req.body;

            await this.product_service.updateProduct(id, updateProductData);

            return res.json({data: 'Done', message: 'updateProduct'});
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({ message: "Invalid product ID." });
            }

            const result = await this.product_service.deleteProduct(id);

            return res.json({ message: result });
        } catch (error) {
            next(error);
        }
    };
}
