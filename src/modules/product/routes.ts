import { Router } from "express"
import { ProductController } from "./controller";
import { validateDto } from "../../middlewares/validation.middleware";
import { CreateProductDTO, UpdateProductDTO } from "./dto";

export class ProductRoutes {
    public path : string = '/product';
    public router : Router = Router()
    public product_controller = new ProductController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.get(`${this.path}`, this.product_controller.getProductsBySearch);
        this.router.get(`${this.path}-by-id/`, this.product_controller.getProductsByIds);

        this.router.post(`${this.path}`, validateDto(CreateProductDTO), this.product_controller.createProduct);

        this.router.patch(`${this.path}/:id`, validateDto(UpdateProductDTO), this.product_controller.updateProduct);

        this.router.delete(`${this.path}/:id`, this.product_controller.deleteProduct);
    }
}