import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Form from './Form';
import auth from '../../auth';

jest.mock('../../auth');
jest.mock('../GoogleButton/GoogleButton', () => ({ type, click }) => <button onClick={click}>GoogleButton</button>);

describe('Form OAuth2 flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.location
    delete window.location;
    window.location = { origin: 'http://localhost:3000', href: '', assign: jest.fn() };
    // Mock window.history.replaceState
    window.history.replaceState = jest.fn();
  });

  it('sends code to backend, receives user, calls auth.login, and redirects', async () => {
    window.location.search = '?code=testcode';
    const mockUser = {
      email: 'test@example.com',
      sub: 'testsub',
      given_name: 'Test',
      family_name: 'User',
      picture: 'http://example.com/pic.jpg',
    };
    const mockFetchResponse = {
      status: 201,
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    };
    global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router history={history}>
        <Form classes={{}} type="login" />
      </Router>,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/user/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ code: 'testcode' }),
        }),
      );
      expect(auth.login).toHaveBeenCalledWith(expect.any(Function), mockUser);
      expect(window.history.replaceState).toHaveBeenCalled();
      auth.login.mock.calls[0][0]();
      expect(history.push).toHaveBeenCalledWith('/profile_settings');
    });
  });

  it('redirects to dashboard for status 200', async () => {
    window.location.search = '?code=testcode';
    const mockUser = { sub: 'testsub' };
    const mockFetchResponse = { status: 200, ok: true, json: jest.fn().mockResolvedValue(mockUser) };
    global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router history={history}>
        <Form classes={{}} type="login" />
      </Router>,
    );

    await waitFor(() => {
      auth.login.mock.calls[0][0]();
      expect(history.push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('redirects to signup for other status', async () => {
    window.location.search = '?code=testcode';
    const mockUser = { sub: 'testsub' };
    const mockFetchResponse = { status: 400, ok: true, json: jest.fn().mockResolvedValue(mockUser) };
    global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router history={history}>
        <Form classes={{}} type="login" />
      </Router>,
    );

    await waitFor(() => {
      auth.login.mock.calls[0][0]();
      expect(history.push).toHaveBeenCalledWith('/signup');
    });
  });
});
