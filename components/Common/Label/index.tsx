import React, { HTMLAttributes } from 'react';

interface LabelProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<
  LabelProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>
> = (props) => {
  const { icon, children, className, ...rest } = props;

  return (
    <span
      className={`flex gap-2 items-center text-text-default-color text-xs not-italic font-normal ${className} whitespace-nowrap`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};

export default Label;
