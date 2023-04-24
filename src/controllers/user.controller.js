import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import userSchema from '../schemas/user.schema.js';
import userRepository from '../repositories/user.repository.js';
import accountRepository from '../repositories/account.repository.js';
import loginSchema from '../schemas/login.schema.js';

async function register(req, res) {
  const {
    error, value: {
      name, email, password,
    },
  } = userSchema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map((detail) => detail.message));

  try {
    const existentUser = await userRepository.findByEmail({ email });

    if (existentUser) return res.status(409).send({ message: 'E-mail already exists.' });

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await userRepository.createUser({
      name,
      email,
      password: hashPassword,
      tokens: [],
    });

    await accountRepository.createAccount({
      userId: user.insertedId,
      balance: 0,
      movements: [],
    });
  } catch (err) {
    console.log(err.message);
  }
  return res.status(201).send('Account created');
}

async function signin(req, res) {
  const { error, value: { email, password } } = loginSchema.validate({
    email: req.body.email, password: req.body.password,
  });

  if (error) return res.status(422).send({ message: 'Invalid e-mail format.' });

  try {
    const validUser = await userRepository.findByEmail({ email });

    if (!validUser) return res.status(404).send({ message: 'User not found' });

    const matchPassword = await bcrypt.compare(password, validUser.password);

    if (!matchPassword) return res.status(401).send({ message: 'Invalid login' });

    const token = uuid();

    await userRepository.updateTokens(validUser._id, token);

    res.status(201).send({ token });
  } catch (err) {
    console.log(err.message);
  }
}

export default {
  register,
  signin,
};
