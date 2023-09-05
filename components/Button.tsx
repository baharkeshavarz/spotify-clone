import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge';

// This means that your Button component can accept all attributes that a regular HTML button element can have.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// The component takes in ButtonProps as its prop type.
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type="button",
    ...props
}, ref) => {

  return (
    <button
      type={type}
      ref={ref}
      {...props}
      disabled={disabled}
      className={ twMerge(`
                border 
                border-transparent 
                hover:opacity-75
                font-bold
                disabled:cursor-not-allowed 
                disabled:opacity-50
                text-black
                bg-spotify-green
                rounded-full
                px-3 
                py-3 
                transition
      `,
       disabled && 'opacity-75 cursor-not-allowed',
       className)}
    >
      {children}
    </button>
  )
});

// This sets the displayName property for the Button component, which can be useful for debugging and development tools.
Button.displayName = "Button";

export default Button;



/*
Ex:
const FancyButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <button type="button" ref={ref} className="FancyButton">
      {props.children}
    </button>
  ))
*/