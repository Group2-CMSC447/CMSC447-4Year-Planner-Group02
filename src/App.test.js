import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByTestId('callYear');
//   expect(linkElement).toBeInTheDocument();
// });

test('url is correct', () => {
  render(<App />);
  const linkElement = screen.getByText(/Check Our Github/i);
  expect(linkElement.href).toContain('https://github.com/Group2-CMSC447/CMSC447-4Year-Planner-Group02');
})