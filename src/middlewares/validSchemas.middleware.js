function validSchemas(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) return res.status(422).send(error.details.map((detail) => detail.message));
    req.locals = value;
    next();
  };
}

export default validSchemas;
