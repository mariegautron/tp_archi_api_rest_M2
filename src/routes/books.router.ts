import { Router } from "express";
import { BooksService } from "../services/books.service";
import Auth from "../auth";

const bookRouter = Router();

const booksService = new BooksService();

/**
 * @openapi
 * /books:
 *   getByCriteria
 */
bookRouter.get("/", Auth.token, (req, res) => {
  const books = booksService.getByCriteria(
    req.query as { title: string; author: string; isbn: string }
  );
  res.status(200).send(books);
});

/**
 * @openapi
 * /books:
 *   getById
 */
bookRouter.get("/:bookId", Auth.token, (req, res) => {
  const book = booksService.getByID(req.params.bookId);
  res.status(200).send(book);
});

/**
 * @openapi
 * /books:
 *   post : Add a book
 */
bookRouter.post("/", Auth.token, Auth.role("saler"), (req, res) => {
  const book = booksService.create(req.body);
  res.status(200).send(book);
});

/**
 * @openapi
 * /books:
 *   put : Update a book
 */
bookRouter.put("/:bookId", Auth.token, Auth.role("saler"), (req, res) => {
  const book = booksService.updateBook(req.body, req.params.bookId);
  res.status(200).send(book);
});

/**
 * @openapi
 * /books:
 *   post
 */
bookRouter.post(
  "/:bookId/comments/",
  Auth.token,
  Auth.role("reader"),
  (req, res) => {
    const books = booksService.addCommentToBook(
      req.body.comment,
      req.params.bookId
    );
    res.status(200).send(books);
  }
);

export default bookRouter;
