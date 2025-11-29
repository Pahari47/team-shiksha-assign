import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}

            <input
                {...props}
                className={`w-full px-3 py-2 border rounded-md outline-none transition
                ${error ? "border-red-500" : "border-gray-300 focus:border-blue-500"}
                `}
            />

            {error && <p className="text-xs text-black">{error}</p>}
        </div>
    )
}

export default Input;