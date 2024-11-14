import clsx from 'clsx';
import { ChangeEventHandler, useId } from 'react';

type LabeledInputProps = {
  id?: string;
  label: string;
  min?: number;
  max?: number;
  value: string | number;
  type?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const LabeledInput = ({
  label,
  value,
  id,
  min,
  max,
  className,
  type = 'text',
  onChange,
}: LabeledInputProps) => {
  id = useId() + id;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input

        id={id}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        type={type}
        className={clsx('w-full', className)}
        readOnly={!onChange}
      />
    </div>
  );
};

export default LabeledInput;
