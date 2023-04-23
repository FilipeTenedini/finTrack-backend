import bcrypt from 'bcrypt';
import userSchema from '../schemas/user.schema.js';
import userRepository from '../repositories/user.repository.js';
import accountRepository from '../repositories/account.repository.js';

async function register(req, res) {
  const { name, email, password } = req.body;
  const { error, value } = userSchema.validate({ name, email, password }, { abortEarly: false });

  if (error) return res.status(422).send(error.details.map((detail) => detail.message));

  try {
    const existentUser = await userRepository.findByEmail({ email: value.email });

    if (existentUser) return res.status(409).send({ message: 'E-mail already exists' });

    const hashPassword = bcrypt.hashSync(value.password, 10);

    const user = await userRepository.createUser({
      name: value.name, email: value.email, password: hashPassword,
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

export default { register };
