import jwt from 'jsonwebtoken';
import { Customer } from '../models';

const createToken = user => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
};

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
        points: 200,
      })
        .then(user => {
          return res.status(201).json({ user: user.toJSON() });
        })
        .catch(error => {
          return res.status(400).json(error);
        });
    });
  }
  static login(req, res) {
    const { email, password } = req.body;
    return Customer.findOne({ where: { email } })
      .then(user => {
        if (!user) {
          return res.status(404).json({
            message: "The credentials you entered are not any account on the system"
          })
        }
        if (user.validatePassword(password)) {
          const token = createToken(user.toJSON());
          res.status(200).json({ token, user: user.toJSON() });
        } else {
          return res.status(401).json({
            message: "Please ensure you have entered a valid email address and password."
          });
        }
      })
      .catch(error =>
        res.status(500).json({ message: "An Error Ocurred", error })
      );
  }

  static async updateBonusPoints(req, res) {
    const { id } = req.params;
    const { requiredPoints } = req.body
    const user = await Customer.findByPk(id)
    const points = parseInt(requiredPoints, 10);
    if (!user) {
        return res.status(404).json({ message: 'User does not exist'});
    }
    if ( points > user.points) {
      return res.status(400).json({message:'user does not have the required points'});
    }
    const substractedPoints = user.points - points;
    return user.update({
     points: substractedPoints
    }).then(user => 
      res.status(200).json({ message: 'Points successfully deducted'})
    );
  }

  static getUser(req, res) {
    const { id } = req.params;
    if (id) {
      Customer.findByPk(id).then((existingUser) => {
        if (existingUser) {
          return res.status(200).json(existingUser.toJSON());
        }
        return res.status(404).json({ message: 'User does not exist'})
      }).catch(error => {
        return res.status(500).json(error);
      });
    }
}
}

export default Auth;
