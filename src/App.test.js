import { render, screen } from '@testing-library/react';
import React from "react";
import App from './App';

describe('Test App', () => {
  it('should render', () => {
    render(<App />);
  });
});

