import { render, fireEvent, screen, cleanup, getByTestId, getByLabelText } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import GenderSelection from "../GenderSelection";

afterEach(cleanup);

it('should render successfully', async () => {
    render(
        <GenderSelection />
    );

    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
});

it('should change checked option', () => {
    const { getByLabelText, getByTestId } = render(
        <GenderSelection />
    );

    const firstRadios = getByTestId('gender').querySelector('input')
    fireEvent.change(firstRadios, { target: { value: 'female' } });
    expect(firstRadios.value).toBe('female');

    const firstRadio = getByLabelText('Male');
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();

    const secondRadio = getByLabelText('Female');
    fireEvent.click(firstRadio);
    expect(firstRadio).toBeChecked();
    expect(secondRadio).not.toBeChecked()
})