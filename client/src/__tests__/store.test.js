import {reducer} from "../store";

test('cake reducer LOADED event', () => {
    const state = [];
    const resp = reducer(state, {
        type: 'LOADED',
        payload: [{id: 1, name: "Test cake"}, {id:2, name: "Dummy cake"}]
    });

    // loaded items are added to the array
    expect(resp.length).toBe(2);
});

test('cake reducer CREATED event', () => {
    const state = [{id: 1, name: "Test cake"}, {id:2, name: "Dummy cake"}]; // previously loaded
    const resp = reducer(state, {
        type: 'CREATED',
        payload: {id: 3, name: "New cake"}
    });

    // new item added to the array
    expect(resp.length).toBe(3);
});