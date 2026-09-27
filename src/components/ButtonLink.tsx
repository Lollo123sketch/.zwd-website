import type { ComponentProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
  className?: string;
} & Pick<ComponentProps<'a'>, 'href' | 'target' | 'rel'>;

export function ButtonLink({
  children,
  variant = 'primary',
  external,
  className = '',
  href = '#',
  ...props
}: Props) {
  const classes = `button button-${variant} ${className}`.trim();
  if (external)
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  return (
    <Link className={classes} to={href}>
      {children}
    </Link>
  );
}
