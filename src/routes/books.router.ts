import { Router } from 'express';
import { BooksService } from '../services/books.service';
import Auth from '../auth'


const bookRouter = Router();

const booksService = new BooksService();

/**
 * @openapi
 * /books:
 *   getById
 */
 bookRouter.get('/:bookId', (req, res) => {
    const book = booksService.getByID(req.params.bookId);
    res.status(200).send(book);
})


/**
 * @openapi
 * /books:
 *   getByCriteria
 */
 bookRouter.get('/', (req, res) => {
    const books = booksService.getByCriteria(req.query as {title: string, author: string, isbn: string});
    res.status(200).send(books);
})

/**
 * @openapi
 * /books:
 *   post
 */
 bookRouter.post('/:bookId/comments/', Auth.token, Auth.role('lecteur'),  (req, res) => {
    const books = booksService.addCommentToBook(req.body.comment, req.params.bookId)
    res.status(200).send(books);
})



export default bookRouter;