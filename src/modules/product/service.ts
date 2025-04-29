import { Service } from "typedi"
import { DB } from "../../database"
import { Op } from "sequelize";
import { CreateProductDTO, UpdateProductDTO } from "./dto";

@Service()
export class ProductService {
    private product = DB.Product;

    public getProductsBySearch = async (search_term: string, price_from: number, price_to: number, sort: number, limit: number, offset: number) => {
        const where: any = {
            record_status: 2
        };

        if (search_term) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search_term}%` } },
                { description: { [Op.like]: `%${search_term}%` } }
            ];
        }

        if (price_from !== undefined) {
            where.price = { ...(where.price || {}), [Op.gte]: price_from };
        }

        if (price_to !== undefined) {
            where.price = { ...(where.price || {}), [Op.lte]: price_to };
        }

        const order: any = [];

        if (sort === 1) {
            order.push(['price', 'ASC']);
        } else if (sort === 2) {
            order.push(['price', 'DESC']);
        }

        const products = await this.product.findAll({
            where,
            order,
            limit,
            offset
        });

        return products;
    }

    public getProductsByIds = async (ids: number[]) => {
        const products = await this.product.findAll({
            where: {
                id: {
                    [Op.in]: ids
                },
                record_status: 2
            }
        });

        return products;
    }

    public createProduct = async (createProductData: CreateProductDTO) => {
        const newProduct = await this.product.create({
            ...createProductData
        });

        return newProduct;
    }

    public updateProduct = async (id: number, updateProductData: UpdateProductDTO) => {
        const product = await this.product.findOne({
            where: {
                id,
                record_status: 2
            }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        await product.update(updateProductData);

        return product;
    }

    public deleteProduct = async (id: number) => {
        const product = await this.product.findOne({
            where: {
                id,
                record_status: {
                    [Op.ne]: 3
                }
            }
        });

        if (!product) {
            throw new Error('Product not found');
        }

        await product.update({ record_status: 3 });

        return 'Done';
    }
}