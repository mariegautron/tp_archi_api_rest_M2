import { UnknownBookError } from "../errors/unknown-book.error";
import { BooksDao } from "../dao/books.dao";
import { BookModel } from "../models/book.model";

const uuid = require("uuid");
const jwt = require("jsonwebtoken");

export class BooksService {
  private bookDAO: BooksDao = new BooksDao();

  public getByID(bookId: string): BookModel {
    return this.bookDAO.getByID(bookId);
  }

  public create(book: BookModel): BookModel {
    return this.bookDAO.create({ ...book, id: uuid.v4() });
  }

  public updateBook(book: BookModel, bookID: string): BookModel {
    const existingBook = this.bookDAO.getByID(bookID);
    if (!existingBook) {
      throw new UnknownBookError("unknown book");
    }

    const bookToUpdate = {
      ...existingBook,
      ...book,
    };

    return this.bookDAO.update(bookToUpdate);
  }

  public getByCriteria({
    title,
    author,
    isbn,
  }: {
    title: string;
    author: string;
    isbn: string;
  }): BookModel[] {
    return this.bookDAO.getByCriteria(title, author, isbn);
  }

  public addCommentToBook(comment: string, bookId: string): BookModel {
    return this.bookDAO.addCommentToBook(comment, bookId);
  }
}
