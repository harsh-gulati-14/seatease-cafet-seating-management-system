import {createMemoryHistory} from 'history';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MemoryRouter} from 'react-router-dom';

import App from './App';

jest.mock('../api/FulfillmentApi');
jest.mock('../api/RewardsApi');
jest.mock('../api/PersonaApi');
jest.mock('../api/TransactionApi');

describe('App Base', () => {
  test('Home Page Renders', async () => {

    const history = createMemoryHistory();
    const {findByText} = render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await (findByText('Demo User 1'))).toBeInTheDocument();
  });

  test('Can select persona', async () => {

    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    //expect(await screen.findByAltText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByAltText('Demo User 1',{},{timeout: 4000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
  });
  test('Can select persona - no profile picture', async () => {

    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 2")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 2',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
  });

  test('Can select category', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByAltText('CategoryTravel',{},{timeout: 3000}));
    expect(await screen.findByText('Now Exploring:', {exact: false})).toBeInTheDocument();
  });

  test('Can select menu and sign out', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    userEvent.click(await screen.findByText('Sign Out',{},{timeout: 3000}));
    expect(await screen.findByText('Select a Persona', {exact: false})).toBeInTheDocument();
  });
  test('Can select transaction history', async () => {
    const mockGetTransactions = [
      {
        id: 1,
        transactionId: null,
        productId: null,
        creditCharge: 1100.0,
        pointsEarned: 0.0,
        statusProcessed: "new",
        creationDate: null,
        lastUpdateDate: null,
        category: "Travel",
        multiplier: 0.05,
        personaId: 4,
        productName: null
      },
      {
        id: 2,
        transactionId: null,
        productId: null,
        creditCharge: 10.0,
        pointsEarned: 0.0,
        statusProcessed: "new",
        creationDate: null,
        lastUpdateDate: null,
        category: "Travel",
        multiplier: 0.05,
        personaId: 4,
        productName: null
      },
      {
        id: 7,
        transactionId: null,
        productId: null,
        creditCharge: 200.0,
        pointsEarned: 0.0,
        statusProcessed: "new",
        creationDate: null,
        lastUpdateDate: null,
        category: "Gas",
        multiplier: 0.05,
        personaId: 4,
        productName: null
      },
      {
        id: 8,
        transactionId: null,
        productId: null,
        creditCharge: 300.0,
        pointsEarned: 0.0,
        statusProcessed: "new",
        creationDate: null,
        lastUpdateDate: null,
        category: "Shopping",
        multiplier: 0.03,
        personaId: 4,
        productName: null
      },
      {
        id: 9,
        transactionId: null,
        productId: null,
        creditCharge: 400.0,
        pointsEarned: 0.0,
        statusProcessed: "new",
        creationDate: null,
        lastUpdateDate: null,
        category: "Food",
        multiplier: 0.02,
        personaId: 4,
        productName: null
      }]

    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByText('Transaction History',{},{timeout: 3000}));
    fetch.mockResponseOnce(JSON.stringify(mockGetTransactions), { status: 200 });
    expect(await screen.findByText('Order History', {exact: false})).toBeInTheDocument();
  });

  test('Can select item', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByAltText('CategoryTravel',{},{timeout: 3000}));
    userEvent.click(await screen.findByAltText('Item One',{},{timeout: 3000}));
    expect(await screen.findByText('Redeem', {exact: true})).toBeInTheDocument();
  });

  test('Can order', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByAltText('CategoryTravel',{},{timeout: 3000}));
    userEvent.click(await screen.findByAltText('Item One',{},{timeout: 3000}));
    userEvent.click(await screen.findByText('Redeem',{},{timeout: 3000}));
    userEvent.click(await screen.findByText("Complete my order",{},{timeout: 3000}));
    userEvent.click(await screen.findByText("OK!",{},{timeout: 3000}));

    await waitFor(() => {
      expect(screen.getByText("Success")).toBeInTheDocument();
    },{timeout:4000});
  });

  test('Can close menu', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    //open menu
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    //close menu
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
  });

  test('Can nav', async () => {
    const history = createMemoryHistory();
    render(<App history={history}/>, {wrapper: MemoryRouter});
    expect(await screen.findByText("Demo User 1")).toBeInTheDocument();
    userEvent.click(await screen.findByText('Demo User 1',{},{timeout: 3000}));
    expect(await screen.findByText('You\'re just a few clicks away from something awesome', {exact: false})).toBeInTheDocument();
    userEvent.click(await screen.findByAltText('CategoryTravel',{},{timeout: 3000}));
    userEvent.click(await screen.findByAltText('Item One',{},{timeout: 3000}));


    await waitFor(() => {
      expect(screen.getByText("Redeem")).toBeInTheDocument();
    },{timeout:4500});
  });

});
