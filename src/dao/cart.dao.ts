import { JsonDB } from 'node-json-db';
import { UserModel } from '../models/user.model';
import { BooksDao } from './books.dao';
import { DatabaseConnection } from './database-connection';
import { UserDao } from './users.dao';

export class CartDao {

    private userDao = new UserDao()
    private booksDao = new BooksDao()


    private databaseConnection: JsonDB

    constructor() {
        // initialize database connection
        this.databaseConnection = DatabaseConnection.getConnection();
    }


    public addBookToCart(bookId: string): UserModel {
        const book = this.booksDao.getByID(bookId)
        // TODO with token
        const user = this.userDao.getByID('3ffda8e7-06a3-4154-96b6-e39260048200')
        user.cart = user.cart || []
        user.cart.push(book)
        return user

    }


}