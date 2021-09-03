import React from "react";
import {render, screen} from '@testing-library/react';
import {MemoryRouter} from "react-router-dom"
import CakeDetails from "../CakeDetails";

test('skeleton shown when loading', () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeDetails loading={true} />
        </MemoryRouter>
    );

    // all skeleton elements are showing
    const skeletons = screen.getAllByTestId('details-skeleton');
    expect(skeletons.length).toBe(6);
    expect(skeletons[0]).toBeVisible();
});

test('displays correct details when loaded', () => {
    const selected = {id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: null, createdBy: 'Test User'};

    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeDetails loading={false} selectedCake={selected} />
        </MemoryRouter>
    );

    const initials = screen.getByLabelText('Author initials');
    const title = screen.getByLabelText('Cake name');
    const author = screen.getByLabelText('Cake author');
    const description = screen.getByLabelText('Description of cake');

    expect(initials).toHaveTextContent(/TU/i);
    expect(title).toHaveTextContent(/Test Cake/i);
    expect(author).toHaveTextContent(/Test User/i);
    expect(description).toHaveTextContent(/Yummy/i);
});

test('avatar conversion from name', () => {
    const selected = {id: 1, title: 'Test Cake', description: 'Yummy cake', imageUrl: null, createdBy: 'Dummy User'};

    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakeDetails loading={false} selectedCake={selected} />
        </MemoryRouter>
    );

    const initials = screen.getByLabelText('Author initials');
    expect(initials).toHaveTextContent(/DU/i);
});