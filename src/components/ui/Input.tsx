'use client';

/**
 * Input — text input + textarea with label, helper text, error state.
 *
 * Single component covers both input and textarea via `multiline` prop. Required
 * marker is GOLD per design-system.md §10 (NOT red). Focus ring uses
 * --accent-muted as a 4px outline halo around the gold border.
 *
 * Tokens consumed: --accent, --accent-muted, --border-dark, --text-primary,
 * --text-secondary, --text-muted, --text-on-light, --text-on-light-secondary,
 * --text-on-light-muted, --error, --radius-md.
 */

import { useId } from 'react';
import type { ChangeEvent } from 'react';
import { cn } from '@/lib/utils';

type InputType = 'text' | 'email' | 'tel' | 'password' | 'number';
type InputVariant = 'dark' | 'light';

interface InputProps {
  label?: string;
  name: string;
  type?: InputType;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  inputClassName?: string;
  variant?: InputVariant;
  id?: string;
}

const FIELD_BASE =
  'w-full px-4 py-3 bg-transparent border-[1.5px] rounded-[var(--radius-md)] font-body text-base transition-colors focus:outline focus:outline-4 focus:outline-[var(--accent-muted)] focus:border-[var(--accent)]';

const FIELD_VARIANT: Record<InputVariant, string> = {
  dark: 'border-[var(--border-dark)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
  light:
    'border-[rgba(14,27,51,0.15)] text-[var(--text-on-light)] placeholder:text-[var(--text-on-light-muted)]',
};

const LABEL_VARIANT: Record<InputVariant, string> = {
  dark: 'text-eyebrow text-[var(--text-secondary)]',
  light: 'text-eyebrow text-[var(--text-on-light-secondary)]',
};

const HELPER_VARIANT: Record<InputVariant, string> = {
  dark: 'text-micro text-[var(--text-muted)]',
  light: 'text-micro text-[var(--text-on-light-muted)]',
};

function Input({
  label,
  name,
  type = 'text',
  multiline = false,
  rows = 4,
  required = false,
  placeholder,
  helperText,
  error,
  value,
  defaultValue,
  onChange,
  className,
  inputClassName,
  variant = 'dark',
  id,
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? `${name}-${generatedId}`;
  const helperId = `${fieldId}-helper`;
  const hasError = Boolean(error);

  const fieldClassName = cn(
    FIELD_BASE,
    FIELD_VARIANT[variant],
    hasError && 'border-[var(--error)] focus:border-[var(--error)]',
    inputClassName
  );

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={fieldId} className={LABEL_VARIANT[variant]}>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-1 text-[var(--accent)]">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}

      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? helperId : undefined}
          className={fieldClassName}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={helperText || error ? helperId : undefined}
          className={fieldClassName}
        />
      )}

      {hasError ? (
        <p id={helperId} className="text-micro text-[var(--error)]">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={helperId} className={HELPER_VARIANT[variant]}>
            {helperText}
          </p>
        )
      )}
    </div>
  );
}

export default Input;
