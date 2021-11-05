import { Router } from "express";
import { CartsService } from "../services/carts.service";

const cartRouter = Router();

const cartService = new CartsService();

// /**
//  * @openapi
//  * /cart:
//  *   add item to user's cart
//  */
//  cartRouter.get('/:bookId', (req, res) => {
//     const book = cartService.addBookToCart(req.params.bookId)
//     res.status(200).send(book);
// })

export default cartRouter;
