import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ProductInterface } from "../../interfaces/product.interface";

export type ProductCreationAttributes = Optional<ProductInterface, 'id'>;

export class ProductModel extends Model<ProductInterface, ProductCreationAttributes> implements ProductInterface {
    public id: number;
    public title: string;
    public description: string;
    public price: number;
    public quantity: number;
    public delivery_fee: number;
    public image_url: string;
    public record_status: number;
}

export default function (sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            delivery_fee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0.00,
            },
            image_url: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            record_status: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'ACTIVE',
            },
        },
        {
            tableName: 'Product',
            sequelize,
            timestamps: false,
        }
    );

    return ProductModel;
}