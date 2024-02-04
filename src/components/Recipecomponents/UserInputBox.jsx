import React from 'react';

function UserInputBox({ placeholder, value, onChange }) {
    return ( 
        <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
            className="mb-2 px-4 py-6 w-full rounded-lg border border-gray-300 block"
    />
    );
}

export default UserInputBox;