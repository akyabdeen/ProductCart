import { App } from "./app";
import { ProductRoutes } from "./modules/product/routes";

const app = new App([new ProductRoutes()]);

app.listen();