import { Router } from "express";
import { UnknownUserError } from "../errors/unknown-user.error";
import { UsersService } from "../services/users.service";
import Auth from "../auth";

const usersRouter = Router();

const usersService = new UsersService();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 */
usersRouter.get("/", (req, res) => {
  const users = usersService.getAllUsers();
  res.status(200).send(users);
});

/**
 * @openapi
 * /users:
 *   getById
 *
 */
usersRouter.get("/:userId", Auth.token, Auth.role("admin"), (req, res) => {
  const users = usersService.getById(req.params.userId);
  res.status(200).send(users);
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: creates a new user
 */
usersRouter.post("/", (req, res) => {
  try {
    const user = usersService.createUser(req.body);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

usersRouter.put("/:userID", (req, res) => {
  try {
    usersService.updateUser(req.body);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

usersRouter.delete(
  "/:userID",
  Auth.token,
  Auth.role("admin"),
  (req: any, res) => {
    console.log(req.user);
    console.log(req);
    try {
      const userId = usersService.deleteUser(req.params.userID, req.user.id);
      res.status(200).send(userId);
    } catch (error) {
      if (error instanceof UnknownUserError) {
        res.status(404);
      } else {
        res.status(400);
      }
      res.send(error.message);
    }
  }
);

export default usersRouter;
