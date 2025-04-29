import { Service } from "typedi"
import { DB } from "../../database"
import { Op } from "sequelize";
import { CreateProductDTO, UpdateProductDTO } from "./dto";
import { HttpException } from "../../exceptions/http.exception";

@Service()
export class ProductService {
    private product_db = DB.Product;

    public getProductsBySearch = async (search_term: string, price_from: number, price_to: number, sort: number, page: number) => {
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

        const limit = 10;
        const offset = (page - 1) * limit;

        const products = await this.product_db.findAll({
            where,
            order,
            limit,
            offset,
            raw: true
        });

        return { products, total_pages: products.length / limit };
    }


    public getProductsByIds = async (ids: number[]) => {
        const products = await this.product_db.findAll({
            where: {
                id: {
                    [Op.in]: ids
                },
                record_status: 2
            }, 
            raw: true
        });

        console.log(ids);
        console.log(products);

        return products;
    }

    public createProduct = async (createProductData: CreateProductDTO) => {
        const newProduct = await this.product_db.create({
            ...createProductData
        }, {raw: true});

        return newProduct;
    }

    public updateProduct = async (id: number, updateProductData: UpdateProductDTO) => {
        const product = await this.product_db.findOne({
            where: {
                id,
                record_status: 2
            },
            raw: true
        });

        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        await product.update(updateProductData);

        return product;
    }

    public deleteProduct = async (id: number) => {
        const product = await this.product_db.findOne({
            where: {
                id,
                record_status: {
                    [Op.ne]: 3
                }
            }, 
            raw: true
        });

        if (!product) {
            throw new HttpException(404, 'Product not found');
        }

        await this.product_db.update({ record_status: 3 }, {where: {id}});

        return 'Done';
    }
}