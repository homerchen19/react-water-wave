declare module 'react-linear-gradient-button' {
  import type React from 'react';

  export interface LinearGradientButtonProps {
    children: React.ReactNode;
    className: string;
    theme: string;
    onClick: () => void;
  }

  const GradientButton: React.ComponentClass<LinearGradientButtonProps>;
  export default GradientButton;
}
