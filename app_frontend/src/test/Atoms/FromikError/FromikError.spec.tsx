import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormikError from '../../../components/Atoms/FormikError/FormikError';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-styled-components';

describe('Testing Formik errors', () => {
  it('Should be  error with props', async () => {
    const errorMessage = 'it is error';
    render(<FormikError errors={errorMessage} touched />);
    const error = screen.queryByTestId('formik-error-wrapper');
    await waitFor(() => {
      const errorText = screen.getByText('it is error');
      expect(error).toBeInTheDocument();
      expect(errorText).toBeInTheDocument();
      expect(errorText.innerHTML).toMatch(errorMessage);
    });
  });

  it('Should be no error without touched prop', async () => {
    render(<FormikError errors="error" touched={false} />);
    const error = screen.queryByTestId('formik-error-wrapper');
    await waitFor(() => {
      expect(error).not.toBeInTheDocument();
    });
  });
});
