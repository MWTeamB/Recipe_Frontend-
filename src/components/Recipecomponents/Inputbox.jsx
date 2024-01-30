import React from 'react';

function Inputbox({ placeholder, value, onChange }) {
    return ( 
        <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
            className="mb-2 px-6 py-8 w-full rounded-lg border border-gray-300 block"
    />
    );
}

export default Inputbox;