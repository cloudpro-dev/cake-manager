import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import CakePanel from '../CakePanel.js'
import {CakesProvider, AuthProvider} from '../../store.js'
import {MemoryRouter} from "react-router-dom"
import http from "../../http-common";

// mock the underlying Axios connection factory
jest.mock('../../http-common')

beforeEach(() => {
    // fixtures for tests
    const fixtures = [
        {id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: 'http://localhost/images/1', createdBy: 'Test User'},
        {id: 2, title: 'Dummy Cake', description: 'Delicious cake', imageUrl: 'http://localhost/images/2', createdBy: 'Dummy User'}
    ];

    // default implementation
    http.get.mockImplementation(() => Promise.resolve({
        status: 200,
        data: fixtures
    }));
});

test('changes in filter update list', async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <AuthProvider authenticated={true}>
                <CakesProvider>
                    <CakePanel />
                </CakesProvider>
            </AuthProvider>
        </MemoryRouter>
    );

    // wait for list elements to appear
    const listEl = await screen.findByRole('button',{
        name: /test cake/i
    })
    expect(listEl).toBeVisible();

    // input search text and click button
    const inputEl = screen.getByPlaceholderText(/Search Cakes/i)
    const btnEl = screen.getByLabelText(/search/i);

    // set query text to match cake details
    fireEvent.change(inputEl, { target: { value: 'test' } })
    btnEl.click();
    expect(listEl).toBeInTheDocument();

    // set query text to NOT match cake details
    fireEvent.change(inputEl, { target: { value: 'tst' } })
    btnEl.click();
    expect(listEl).not.toBeInTheDocument();
});

test('success url shows alert', () => {
    // set the URL to contains the form success markers
    render(
        <MemoryRouter initialEntries={["/?success=true&id=999"]}>
            <AuthProvider authenticated={true}>
                <CakesProvider>
                    <CakePanel />
                </CakesProvider>
            </AuthProvider>
        </MemoryRouter>
    );

    // snackbar alert should be visible
    const el = screen.getByRole("alert")
    expect(el).toBeVisible()
});

test('selected list item loads details', async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <AuthProvider authenticated={true}>
                <CakesProvider>
                    <CakePanel />
                </CakesProvider>
            </AuthProvider>
        </MemoryRouter>
    );

    // get list entry to click
    const listEl = await screen.findByRole(/button/i, {name: /dummy cake/i});
    listEl.click();

    // make sure cake image becomes available
    const imgEl = await screen.findByLabelText("Picture of cake");
    expect(imgEl).toBeVisible();
    expect(imgEl).toHaveAttribute('src', 'http://localhost/images/2');
});