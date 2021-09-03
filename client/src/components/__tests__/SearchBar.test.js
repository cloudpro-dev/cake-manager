import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import SearchBar from '../SearchBar';

test('search bar disabled when cakes are loading', () => {
    const onSearch = () => {};
    render(
        <SearchBar onSearch={onSearch} loading={true} />
    );
    const inputEl = screen.getByPlaceholderText(/Search Cakes/i);
    expect(inputEl).toBeDisabled();
    const btnEl = screen.getByLabelText(/search/i);
    expect(btnEl).toBeDisabled();
});

test('search bar enabled when cakes are loaded', () => {
    const onSearch = () => {};
    render(
        <SearchBar onSearch={onSearch} loading={false} />
    );
    const inputEl = screen.getByPlaceholderText(/Search Cakes/i);
    expect(inputEl).toBeEnabled();
    const btnEl = screen.getByLabelText(/search/i);
    expect(btnEl).toBeEnabled();
});

test('on click search icon triggers search', () => {
    const onSearch = jest.fn()
    render(
        <SearchBar onSearch={onSearch} loading={false} />
    );
    // put a value in the search field and click search button
    const inputEl = screen.getByPlaceholderText(/Search Cakes/i);
    fireEvent.change(inputEl, { target: { value: 'lemon' } })
    const btnEl = screen.getByLabelText(/search/i);
    btnEl.click();

    // expectations
    expect(onSearch.mock.calls.length).toBe(1);
    expect(onSearch.mock.calls[0][0]).toBe("lemon");
});

test('on enter triggers search', () => {
    const onSearch = jest.fn()
    render(
        <SearchBar onSearch={onSearch} loading={false} />
    );
    // put a value in the search field and press Enter key
    const inputEl = screen.getByPlaceholderText(/Search Cakes/i)
    fireEvent.change(inputEl, { target: { value: 'blue' } })
    fireEvent.keyDown(inputEl, { key: 'Enter' })

    // expectations
    expect(onSearch.mock.calls.length).toBe(1);
    expect(onSearch.mock.calls[0][0]).toBe("blue");
});