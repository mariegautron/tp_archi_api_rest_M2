import { CartDao } from "../dao/cart.dao";
import { UserModel } from "../models/user.model";

const uuid = require("uuid");
const jwt = require("jsonwebtoken");

export class CartsService {
  private cartsDAO: CartDao = new CartDao();

  // public addBookToCart(bookId: string): UserModel {
  //     return this.cartsDAO.addBookToCart(bookId)
  // }
}
