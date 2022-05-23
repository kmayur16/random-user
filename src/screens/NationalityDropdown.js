import React from "react";

function NationalityDropdown({ onChange, setLoc, value }) {
    return (
        <div data-testid='drop'>
            <p style={{ fontWeight: 'bold', opacity: 0.8 }}>Select Nationality:</p>
            <select data-testid='select' className="nationality" id="nationality"
                value={value}
                onChange={onChange}
            >
                <option data-testid='select-option'>AU</option>
                <option>BR</option>
                <option>CA</option>
                <option>CH</option>
                <option>DE</option>
                <option>DK</option>
                <option>ES</option>
                <option>FI</option>
                <option>FR</option>
                <option>GB</option>
                <option>IR</option>
                <option>IE</option>
                <option>NO</option>
                <option>NL</option>
                <option>NZ</option>
                <option>TR</option>
                <option>US</option>
            </select>
        </div>
    )
}

export default NationalityDropdown;