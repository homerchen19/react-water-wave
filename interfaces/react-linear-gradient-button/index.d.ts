declare module 'react-linear-gradient-button' {
  import * as React from './node_modules/react';

  export interface LinearGradientButtonProps {
    children: React.ReactNode;
    className: string;
    theme: string;
    onClick: () => void;
  }

  const GradientButton: React.ComponentClass<LinearGradientButtonProps>;
  export default GradientButton;
}
