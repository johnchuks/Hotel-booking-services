import bcrpyt from 'bcrypt';

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Enter your first name"
        }
      }
    },
    lastName: { 
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: "Enter your last name"
        }
      }
    },
    email: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: "Email already exist" },
      validate: {
        notEmpty: {
          message:"Enter an email address",
        },
        isEmail: { args: true, msg: "Please enter a valid email address" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCreate:((user, options) => {
        const hash = bcrpyt.hashSync(user.password, saltRounds);
        user.password = hash;
        
      })
    },
  })
  Customer.prototype.toJSON = function() {
    const user = { ...this.dataValues };
    delete user.password;
    return user;
  };
  Customer.prototype.validatePassword = function(password) {
    return bcrpyt.compareSync(password, this.password);
  };
  return Customer;
}
