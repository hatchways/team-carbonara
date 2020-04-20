const User = require('../models/User');
const _ = require('lodash');
const { google } = require('googleapis');
const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, `postmessage`);
//required to parse token
// const { OAuth2Client } = require('google-auth-library');

//function to verify token
async function verifyToken(token) {
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    //second verification of token
    if (
      payload.aud !== process.env.CLIENT_ID ||
      (payload.iss !== 'accounts.google.com' && payload.iss !== 'https://accounts.google.com')
    ) {
      throw 'Token is not from client or issued by Google';
    }

    return payload;
  } catch (err) {
    console.error(err);
  }
}

//Handle User Google Sign-in
const userLogin = async (req, res) => {
  try {
    let payload;
    let oauthResp;
    //req body is code or id_token
    if (req.body.code) {
      oauthResp = await oauth2Client.getToken(req.body.code);
      payload = await verifyToken(oauthResp.tokens.id_token);
    } else {
      console.log('token', req.body.token);
      payload = await verifyToken(req.body.token);
    }

    //creates an obj composed of another obj properties
    const user = _.pick(payload, ['email', 'sub', 'given_name', 'family_name', 'picture']);

    //Checks if user exists in database
    const userExists = await User.findOne({ sub: user.sub });

    if (userExists) {
      //update tokens for registered users on signup path
      if (req.body.code) {
        userExists.access_token = oauthResp.tokens.access_token;
        userExists.refresh_token = oauthResp.tokens.refresh_token;
        await userExists.save();
      }
      //implement sessions later
      req.session.userID = user.sub;
      return res.status(200).end();
    }

    //Implied VALIDATION via Google
    const newUser = new User(user);
    //add default 60min meeting
    newUser.meetings = [{ meetingName: '60 minute meeting', duration: 60 }];
    //add tokens
    newUser.access_token = oauthResp.tokens.access_token;
    newUser.refresh_token = oauthResp.tokens.refresh_token;
    newUser.subscriber = false;

    try {
      const savedUser = await newUser.save();

      //implement sessions later
      req.session.userID = user.sub;
      res.status(201).send(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ sub });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const getUserByUrl = async (req, res) => {
  const userUrl = req.params.url;

  try {
    const user = await User.findOne({ url: userUrl });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const isUnique = (req, res) => {
  User.findOne({ url: req.query.url })
    .then((user) => {
      if (!user) {
        res.status(200).json({ isUnique: true });
      } else {
        res.status(200).json({ isUnique: false });
      }
    })
    .catch((err) => res.status(500).send('Server Error:' + err));
};

const updateUser = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ sub });

    user.url = req.body.url;
    user.availability.hours = req.body.hours;
    user.timezone = req.body.timeZone;
    user.availability.days = req.body.days;
    await user.save();

    res.status(200).send('User profile updated');
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

const updateMeetings = async (req, res) => {
  const sub = req.params.id;

  try {
    const user = await User.findOne({ sub });
    user.meetings.push(req.body);
    await user.save();
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

module.exports = { userLogin, getUser, getUserByUrl, isUnique, updateUser, updateMeetings };
