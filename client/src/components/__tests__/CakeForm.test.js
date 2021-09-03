import React from "react";
import {render, screen, waitFor} from '@testing-library/react';
import {Router, MemoryRouter} from "react-router-dom"
import {CakesProvider} from "../../store";
import CakeForm from '../CakeForm'
import http from "../../http-common";
import { createMemoryHistory } from 'history'

// mock the underlying Axios connection factory
jest.mock('../../http-common')

const successResponse = {
    status: 200,
    data: {
        "id":1,
        "title":"Test Cake",
        "description":"Yummy cake",
        "imageUrl":"http://localhost:8282/images/1",
        "createdBy":"cloudpro-dev"
    }
}

beforeEach(() => {
    // default implementation
    http.post.mockImplementation(() => Promise.resolve(successResponse));
});

test('fields with errors will show message', async () => {
    // invalid form data response from server
    const resp = {
        response: {
            status: 400,
            data: {
                "message": "Please review your inputs",
                "description": null,
                "fieldErrors":
                    [
                        {
                            "objectName": "cakeDto",
                            "field": "title",
                            "message": "Please provide a title"
                        },
                        {
                            "objectName": "cakeDto",
                            "field": "description",
                            "message": "Please provide a description"
                        },
                        {
                            "objectName": "cakeDto",
                            "field": "imageUrl",
                            "message": "Please provide the URL of an image"
                        }
                    ]
            }
        }
    };

    // override default mock in beforeEach
    http.post.mockImplementation(() => Promise.reject(resp));

    render(
        <MemoryRouter initialEntries={["/"]}>
            <CakesProvider>
                <CakeForm />
            </CakesProvider>
        </MemoryRouter>
    );

    // submit form
    const submitEl = screen.getByRole('button', {name: 'Submit'})
    submitEl.click();

    // check fields are showing the errors
    expect(await screen.findByText(/please provide a title/i)).toBeVisible();
    expect(await screen.findByText(/please provide a description/i)).toBeVisible();
    expect(await screen.findByText(/please provide the url of an image/i)).toBeVisible();
});

test('valid form redirects', async () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <CakesProvider>
                <CakeForm />
            </CakesProvider>
        </Router>
    );

    // submit form
    // we don't need to set form values because we mock the Axios response to Promise.resolve
    screen.getByRole('button', {name: 'Submit'}).click()

    await waitFor(() => expect(history.location.search).toBe('?success=true&id=1'));
});

test('form is disabled during submit', async () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <CakesProvider>
                <CakeForm />
            </CakesProvider>
        </Router>
    );

    // submit form
    screen.getByRole('button', {name: 'Submit'}).click()

    // ensure all form elements are disabled while data is submitted
    expect(screen.getByLabelText(/title/i)).toBeDisabled();
    expect(screen.getByLabelText(/description/i)).toBeDisabled();
    expect(screen.getByLabelText(/image url/i)).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Submit'})).toBeDisabled();
    expect(screen.getByRole('button', {name: 'Back'})).toHaveAttribute('aria-disabled', 'true')

    // wait for page to redirect before closing test scope
    await waitFor(() => expect(history.location.search).toBe('?success=true&id=1'));
});

test('progress indicator shown during submit', async () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <CakesProvider>
                <CakeForm />
            </CakesProvider>
        </Router>
    );

    // submit form
    screen.getByRole('button', {name: 'Submit'}).click();

    // make sure the progress bar is showing
    expect(screen.getByRole('progressbar')).toBeVisible();

    // wait for page to redirect before closing test scope
    await waitFor(() => expect(history.location.search).toBe('?success=true&id=1'));
});