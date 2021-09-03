import React from "react";
import {render, screen} from '@testing-library/react';
import NavBar from '../NavBar'
import {AuthProvider} from '../../store.js'

test('show login button when unauthenticated', () => {
    render(
        <AuthProvider authenticated={false}>
            <NavBar />
        </AuthProvider>
    );
    const inputEl = screen.getByTitle(/Login/i);
    expect(inputEl).toBeVisible();
});

test('show profile button when unauthenticated', () => {
    render(
        <AuthProvider authenticated={true}>
            <NavBar />
        </AuthProvider>
    );
    const inputEl = screen.getByTitle(/Profile/i);
    expect(inputEl).toBeVisible();
});