import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
    loading = false,
    variant = "primary",
    children,
    ...props
}) => {
    const base =  "px-4 py-2 rounded-md font-medium transition w-full flex items-center justify-center";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    }

    return (
        <button
            {...props}
            disabled = {loading || props.disabled}
            className={`${base} ${variants[variant]} ${
                props.disabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
            {loading ? "Loading..." : children}
        </button>
    )
}

export default Button;