import { BooksDao } from '../dao/books.dao';
import { BookModel } from '../models/book.model';
import { UserModel } from '../models/user.model';

const uuid = require('uuid')
const jwt = require('jsonwebtoken');

export class BooksService {
    private bookDAO: BooksDao = new BooksDao()

    public getByID(bookId: string): BookModel {
        return this.bookDAO.getByID(bookId)
    }

    public getByCriteria({title, author, isbn}: {title: string, author: string, isbn: string}): BookModel[] {
        return this.bookDAO.getByCriteria(title, author, isbn)
    }

    public addCommentToBook(comment: string, bookId: string): BookModel {
        return this.bookDAO.addCommentToBook(comment, bookId)
    }




}