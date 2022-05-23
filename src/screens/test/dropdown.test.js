import { render, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { ReactDOM } from "react-dom";
import NationalityDropdown from '../NationalityDropdown'

afterEach(cleanup);

test("renders without crashing for dropdown", () => {
    const { getAllByTestId, getByTestId } = render(
        <NationalityDropdown />
    );

    const dropdown = getByTestId('select');
    let options = getAllByTestId('select-option');

    fireEvent.change(dropdown, { target: { value: 'AU' } })
    expect(dropdown.value).toBe('AU');

    expect(options[0].selected).toBeTruthy()
    expect(options[1]?.selected).toBeFalsy()
    expect(options[2]?.selected).toBeFalsy()
})

