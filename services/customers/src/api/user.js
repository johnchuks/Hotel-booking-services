import jwt from 'jsonwebtoken';
import { Customer } from '../models';



class Auth {
  static register(req, res) {
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

    Customer.findOne({
      where: {
        email
      }
    }).then(existingUser => {
      if (existingUser) {
        return res.status(409).send({ message: "User already exists" });
      }
      return Customer.create({
        firstName,
        lastName,
        email,
        password,
      })
        .then(user => {
          return res.status(201).json({ user: user.toJSON() });
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    });
  }
  static getUser(req, res) {
    const { email } = req.query;
    if (email) {
      const user = Customer.findOne({
        where: {
          email
        }
      }).then((existingUser) => {
        if (existingUser) {
          return res.status(200).json(existingUser.toJSON());
        }
        return res.status(404).json({ message: 'User does not exist'})
      }).catch(error => {
        return res.status(400).json(error);
      });
    }
    return res.status(400).json({ message: 'An error occurred'})
}
}

export default Auth;
