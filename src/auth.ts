const jwt = require("jsonwebtoken");

export default class Auth {
  /**
   * Check JWT Token
   */
  static token(req: any, res: any, next: any) {
    const token = req.header("Authorization");
    if (typeof token !== "undefined") {
      jwt.verify(
        token.split(" ")[1],
        process.env.TOKEN_KEY,
        (err: any, data: any) => {
          if (err) return res.status(403).json({ message: "Forbidden" });
          req.user = data;
          next();
        }
      );
    } else res.status(403).json({ message: "Forbidden" });
  }

  /**
   * Check Role
   */
  static role(...roles: string[]) {
    return (req: any, res: any, next: any) => {
      const { user } = req;
      if (user.roles.some((e: string) => roles.includes(e))) {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    };
  }
}
