import React from "react";
import {fireEvent, render, screen} from '@testing-library/react';
import CakeList from '../CakeList.js'
import {MemoryRouter} from "react-router-dom"

test('skeleton shown when loading', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeList isAuthenticated={false} selectedIndex={0} loading={true} />
        </MemoryRouter>
    );

    const skeletons = screen.getAllByTestId('list-skeleton');
    expect(skeletons[0]).toBeVisible();
});

test('add cakes disabled when unauthenticated', () => {
    const fixtures = [{id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: 'http://localhost/images/1'}]

    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeList isAuthenticated={false} cakes={fixtures} selectedIndex={0} loading={false} />
        </MemoryRouter>
    );

    const btnEl = screen.getByRole('button', {name: 'add'})
    expect(btnEl).toHaveAttribute('aria-disabled', 'true')
});

test('show cakes list when loaded', () => {
    const fixtures = [{id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: 'http://localhost/images/1'}]
    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeList isAuthenticated={false} cakes={fixtures} selectedIndex={0} loading={false} />
        </MemoryRouter>
    );

    const btnEl = screen.getByText(/test cake/i)
    expect(btnEl).toBeVisible()
});

test('callback fired on selection event', () => {
    const fixtures = [{id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: 'http://localhost/images/1', createdBy: 'Test User'}]
    const selectFn = jest.fn();
    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeList isAuthenticated={false} cakes={fixtures} selectedIndex={0} onSelect={selectFn} loading={false} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/test cake/i))
    expect(selectFn).toHaveBeenCalledTimes(1);
});