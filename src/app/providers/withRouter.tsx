import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface WithRouterProps {
  children: React.ReactNode;
}

export default function WithRouter({ children }: WithRouterProps) {
  return (
    // <BrowserRouter basename="/">
    <BrowserRouter basename="https://4svEXE.github.io/MarynaHolovan/">
        {children}
    </BrowserRouter>
  );
}
