import React from "react";
import {render, screen} from '@testing-library/react';
import App from '../App';
import {AuthProvider} from '../store';
import {MemoryRouter} from "react-router-dom";

test('renders backdrop when authentication pending', () => {
  render(
      <AuthProvider authPending={true}>
        <App />
      </AuthProvider>
  );
  const rootEl = document.querySelector(".MuiBackdrop-root")
  expect(rootEl).toBeInTheDocument();
});

test('renders main UI if authentication is complete', () => {
  render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider authPending={false}>
          <App />
        </AuthProvider>
      </MemoryRouter>
  );
  const rootEl = screen.getByText(/Cake Manager/i);
  expect(rootEl).toBeInTheDocument();
});

test('react-router shows cake form on /add', () => {
  render(
      <MemoryRouter initialEntries={["/add"]}>
        <AuthProvider authPending={false}>
          <App />
        </AuthProvider>
      </MemoryRouter>
  );
  const rootEl = screen.getByText(/Create a new Cake/i);
  expect(rootEl).toBeInTheDocument();
});

