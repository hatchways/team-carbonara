const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const usersController = require('../controllers/usersController');

const mockPayload = {
  email: 'test@example.com',
  sub: 'testsub',
  given_name: 'Test',
  family_name: 'User',
  picture: 'http://example.com/pic.jpg',
  aud: process.env.CLIENT_ID,
  iss: 'accounts.google.com',
};

describe('usersController', () => {
  let req, res;
  let findOneStub, saveStub, getTokenStub, verifyIdTokenStub;

  beforeEach(() => {
    req = { body: {}, session: {} };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
      end: sinon.stub(),
      json: sinon.stub(),
    };
    // Stub User model methods
    findOneStub = sinon.stub(require('../models/User'), 'findOne');
    saveStub = sinon.stub(require('../models/User').prototype, 'save');
    // Stub googleapis OAuth2Client methods
    const { oauth2Client } = require('../controllers/usersController');
    getTokenStub = sinon.stub(oauth2Client, 'getToken');
    verifyIdTokenStub = sinon.stub(oauth2Client, 'verifyIdToken');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle Google OAuth sign-in with code', async () => {
    req.body.code = 'testcode';
    getTokenStub.resolves({ tokens: { id_token: 'idtoken', access_token: 'access', refresh_token: 'refresh' } });
    verifyIdTokenStub.resolves({ getPayload: () => mockPayload });
    findOneStub.resolves(null);
    saveStub.resolves({ ...mockPayload });

    await usersController.userLogin(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.send.called).to.be.true;
  });

  it('should handle Google OAuth sign-in with id_token', async () => {
    req.body.token = 'idtoken';
    verifyIdTokenStub.resolves({ getPayload: () => mockPayload });
    findOneStub.resolves(null);
    saveStub.resolves({ ...mockPayload });

    await usersController.userLogin(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.send.called).to.be.true;
  });

  it('should update tokens for existing user', async () => {
    req.body.code = 'testcode';
    getTokenStub.resolves({ tokens: { id_token: 'idtoken', access_token: 'access', refresh_token: 'refresh' } });
    verifyIdTokenStub.resolves({ getPayload: () => mockPayload });
    findOneStub.resolves({ sub: 'testsub', save: sinon.stub().resolves() });

    await usersController.userLogin(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.end.called).to.be.true;
  });

  it('should handle invalid token', async () => {
    req.body.token = 'badtoken';
    verifyIdTokenStub.rejects(new Error('Invalid token'));
    findOneStub.resolves(null);

    await usersController.userLogin(req, res);
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.send.called).to.be.true;
  });
});
