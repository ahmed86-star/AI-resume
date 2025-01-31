import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AISuggestions from '../src/components/AISuggestions';

// Mock the fetch API
global.fetch = jest.fn() as jest.Mock;

describe('AISuggestions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('shows loading state during API call', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise(resolve => setTimeout(() => resolve({ ok: true, json: () => ({ suggestions: [] }) }), 100))
    );

    render(<AISuggestions content="test" section="summary" />);
    fireEvent.click(screen.getByText('Generate'));
    expect(await screen.findByRole('status')).toBeInTheDocument();
  });

  it('displays error message on failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
    render(<AISuggestions content="test" section="summary" />);
    fireEvent.click(screen.getByText('Generate'));
    
    await waitFor(() => {
      expect(screen.getByText(/failed to generate/i)).toBeInTheDocument();
    });
  });
}); 