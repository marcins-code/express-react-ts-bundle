import React from 'react';
import { render, screen } from '@testing-library/react';
import Switcher from '../../../components/Atoms/Switcher/Switcher';

describe('Testing switcher variants', () => {
  it('Should be checkbox type', () => {
    render(<Switcher
      name="my-checkbox"
      onChange={() => {}}
      notCheckedColor="red"
      switchColor="success"
      defaultChecked={false}
      value={3}

    />);
    const switcher = screen.getByRole('checkbox');
    expect(switcher).toBeInTheDocument();
    expect(switcher).not.toBeChecked();
    expect(switcher).toHaveAttribute('id', 'my-checkbox');
    expect(switcher).toHaveAttribute('type', 'checkbox');
    expect(switcher).toHaveAttribute('value', '3');
  });
  test('Should be radio type', () => {
    render(<Switcher
      name="my-radio"
      onChange={() => {}}
      notCheckedColor="red"
      switchColor="success"
      defaultChecked
      value={undefined}
      type="radio"
    />);
    const switcher = screen.getByRole('radio');
    expect(switcher).toBeInTheDocument();
    expect(switcher).toBeChecked();
    expect(switcher).toHaveAttribute('id', 'my-radio');
    expect(switcher).toHaveAttribute('type', 'radio');
    expect(switcher).toHaveAttribute('value', undefined);
  });
});
