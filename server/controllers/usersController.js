const User = require('../models/User');
const _ = require('lodash');

//required to parse token
const { OAuth2Client } = require('google-auth-library');

//function to verify token
async function verifyToken(token) {
  const client = new OAuth2Client(process.env.CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const payload = ticket.getPayload();

  //second verification of token
  if (
    payload.aud !== process.env.CLIENT_ID ||
    payload.iss !== ('accounts.google.com' || 'https://accounts.google.com')
  ) {
    console.error('Token is not from client or issued by Google');
  }

  return payload;
}

//Handle User Google Sign-in
const userLogin = async (req, res) => {
  const payload = await verifyToken(req.body).catch((e) => res.status(400).send('Error verifying token'));

  //creates an obj composed of another obj properties
  const user = _.pick(payload, ['email', 'sub', 'given_name', 'family_name', 'picture']);

  //Checks if user exists in database
  const userExists = await User.findOne({ sub: user.sub });

  if (userExists) {
    //assign userID to session
    req.session.userID = user.sub;
    return res.status(200).send('Should be on dashboard');
  }

  //Create new user
  const newUser = new User(user);

  try {
    //Implied VALIDATION via Google
    const savedUser = await newUser.save();
    req.session.userID = user.sub;
    res.status(201).send(savedUser);
  } catch (err) {
    console.error('Error creating account');
  }
};

const isUnique = (req, res) => {
  User.findOne({ url: req.query.url })
    .then(user => {
      if (user) {
        return res.json({ 'response': false });
      } else {
        return res.json({ 'response': true });
      }
    });
};

const update = (req, res) => {
  User.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true },
    (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

module.exports = { userLogin, isUnique, update };
