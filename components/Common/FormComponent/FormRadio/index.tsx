import { cn, isUuid } from '@/helper/utils';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormInput } from '..';

interface FormRadioProps {
  children: ReactElement | ReactElement[];
  name: string;
  form: UseFormReturn<any, any, undefined>;
  label: string;
  multiple?: boolean;
  disable?: boolean;
  className?: string;
  description?: string;
  placeholder?: string;
}

export type SelectType = string[] | boolean[] | number[];

export const FormRadio: FC<FormRadioProps> = ({
  form,
  label,
  name,
  children,
  multiple,
  disable,
  className,
  description,
  placeholder
}) => {
  const [select, setSelect] = useState<SelectType>([]);

  let multipleProps = {};

  if (multiple) {
    multipleProps = {
      multiple,
      select,
      setSelect
    };
  }

  useEffect(() => {
    setTimeout(() => {
      const defaultSelect: string[] =
        multiple && form.getValues(name)?.split ? (form.getValues(name) || '').split(',') : [];
      setSelect(defaultSelect);
    }, 300);
  }, []);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="">
        <p className="body-m text-left leading-[160%] text-neutral-rich-gray">{label}</p>
        {description && <p className="body-m leading-[160%] text-neutral-medium-gray">{description}</p>}
        {isUuid(name) && placeholder && (
          <p className="body-s text-left text-[14px] text-neutral-medium-gray">{placeholder}</p>
        )}
      </div>
      <div className={cn('flex w-full justify-between gap-5', className)}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, { name, form, disable, ...multipleProps } as any);
        })}
      </div>

      <FormInput name={name} label="" placeholder="" form={form} className="hidden" />
    </div>
  );
};

export default FormRadio;
