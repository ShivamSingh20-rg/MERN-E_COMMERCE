const userService = require("../services/user.service");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const user = userService.crateUsers(req.body);
    return res.send({ user, message: "register success" });
  } catch (error) {
    return res.send({ error: error.message });
  }
};


const Login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await userService.finduserbyEmail(email);
    console.log(user);
    if (!user) {
      return res.send({ message: "invalid user email ", email });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.send({ message: "invalid password..." });
    }
    const jwt = userService.generateToken(user._id);

    return res.send({ user, jwt, message: "login success" });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

module.exports = { Signup, Login };
