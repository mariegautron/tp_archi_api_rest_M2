import { JsonDB } from "node-json-db";
import { BookModel } from "../models/book.model";
import { DatabaseConnection } from "./database-connection";

export class BooksDao {
  private databaseConnection: JsonDB;

  constructor() {
    // initialize database connection
    this.databaseConnection = DatabaseConnection.getConnection();
  }

  public getByID(bookId: string): BookModel {
    const index = this.getBooksIndexByID(bookId);
    if (index > -1) {
      return this.databaseConnection.getData(`/books[${index}]`);
    }
  }

  public create(book: BookModel): BookModel {
    this.databaseConnection.push("/books[]", book);
    return book;
  }

  public update(book: BookModel): BookModel {
    const index = this.getBooksIndexByID(book.id);
    if (index > -1) {
      this.databaseConnection.push(`/books[${index}]`, book, true);
      return book;
    }
  }

  public getByCriteria(
    title?: string,
    author?: string,
    isbn?: string
  ): BookModel[] {
    const books = this.databaseConnection.getData(`/books`);
    if (!title && !author && !isbn) {
      return books;
    }
    return books.filter(
      (book: BookModel) =>
        book.title === title || book.author === author || book.isbn === isbn
    );
  }

  public addCommentToBook(comment: string, bookId: string): BookModel {
    const book = this.getByID(bookId);
    book.comments = book.comments || [];
    book.comments.push(comment);
    return book;
  }

  private getBooksIndexByID(bookID: string): number {
    return this.databaseConnection.getIndex("/books", bookID, "id");
  }
}
