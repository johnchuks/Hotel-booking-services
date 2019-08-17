import jwt from 'jsonwebtoken';
import { User } from '../models';


const createToken = user => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

class Auth {
  static create(req, res) {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName ||!lastName || !email ||!password) {
      return res.status(401).json({ message: "Enter all required field" });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({
        message: "Email is not rightly formatted"
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        message: "Password length must be more than 4"
      });
    }

    User.findOne({
      where: {
        email
      }
    }).then(existingUser => {
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      return User.create({
        firstName,
        lastName,
        email,
        password,
      })
        .then(user => {
          const token = createToken(user.toJSON());
          return res.status(201).json({ token, user: user.toJSON() });
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    });
  }
}

export default Auth;
