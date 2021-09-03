import React from "react";
import {render, screen} from '@testing-library/react';
import ProfilePopover from "../ProfilePopover";

test('shows user details when popover is open', () => {
    const userDetails = {
        avatar: 'http://localhost/images/1',
        name: 'Test Name',
        alt: 'test@test.com'
    };
    const refEl = document.createElement('div', {});
    render(
        <ProfilePopover anchorEl={refEl} isOpen={true} userDetails={userDetails} />
    );
    const nameEl = screen.getByText(/Test Name/i)
    expect(nameEl).toBeVisible();
    const altEl = screen.getByText(/test@test.com/i)
    expect(altEl).toBeVisible();
    const avatarEl = screen.getByRole('img');
    expect(avatarEl).toHaveAttribute('src', 'http://localhost/images/1');
})

test('when logout button clicked call logout fn', () => {
    const closeFn = jest.fn();
    const logoutFn = jest.fn();
    const refEl = document.createElement('div', {});
    render(
        <ProfilePopover anchorEl={refEl} isOpen={true} onClose={closeFn} onLogout={logoutFn} />
    );
    const btnEl = screen.getByRole('button')
    btnEl.click();
    expect(logoutFn.mock.calls.length).toBe(1);
});
