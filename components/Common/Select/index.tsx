import { cn } from '@/helper/utils';
import { Rule } from 'async-validator';
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import CloseIcon from '../Icon/Close';
import PassIcon from '../Icon/Pass';
import WarningIcon from '../Icon/Warning';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import { OptionType } from './type';

interface SelectProps {
  name: string;
  label?: string | ReactNode;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  onChange: (v: string) => void;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  defaultValue?: string;
  options: OptionType[];
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

const Select = forwardRef<
  InputRef,
  SelectProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const {
    label,
    placeholder,
    description,
    state: propsState,
    errorMessage: propsErrorMessage,
    name,
    rules,
    className,
    onChange,
    disabled,
    defaultValue = '',
    options,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState(propsState);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState(defaultValue);
  const [selectLabel, setSelectLabel] = useState('');
  const [visibleOption, setVisibleOption] = useState(false);

  useEffect(() => {
    setStatus(propsState);
  }, [propsState]);

  useEffect(() => {
    const l = options?.find((v) => v.value === value)?.label || '';
    setSelectLabel(l);
  }, [value, options]);

  useEffect(() => {
    setErrorMessage(propsErrorMessage || '');
  }, [propsErrorMessage]);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
      setStatus(value: any) {
        setStatus(value);
      },
      setErrorMessage(value: any) {
        setErrorMessage(value);
      }
    };
  });

  return (
    <div className="relative flex w-full flex-col gap-[0.75rem]">
      {label ? (
        <p className="font-next-poster text-[21px] leading-[125%] tracking-[1.26px]">
          {label}
        </p>
      ) : null}

      <div className="relative">
        <input
          ref={inputRef}
          onFocus={() => setVisibleOption(true)}
          onBlur={() =>
            setTimeout(() => {
              setVisibleOption(false);
            }, 310)
          }
          type={'text'}
          value={selectLabel}
          readOnly
          placeholder={placeholder}
          className={cn(
            `body-m w-full cursor-pointer rounded-[2.5rem] border border-solid border-neutral-dark-gray px-[25px] py-[15px]  caret-[#ffffff] outline-none hover:border-neutral-dark-gray focus:border-neutral-dark-gray`,
            // type === 'password' &&
            //   'border-auth-password-input-bg focus:border-neutral-dark-gray',
            status === 'success'
              ? 'border-auth-input-success-color focus:border-auth-input-success-color'
              : '',
            status === 'error'
              ? 'border-auth-input-error-color focus:border-auth-input-error-color'
              : '',
            className
          )}
          {...rest}
        />

        <span className="absolute right-[1.4375rem] top-[50%] flex -translate-y-[50%] items-center gap-4">
          {status === 'default' && (
            <AiFillCaretDown className=" text-[20px] text-neutral-medium-gray" />
          )}
          {status === 'error' && (
            <span
              className="flex cursor-pointer items-center justify-center text-auth-input-error-color"
              onClick={() => {
                setValue('');
                setErrorMessage('');
                setStatus('default');
                onChange?.('');
              }}
            >
              <CloseIcon width={20} height={20}></CloseIcon>
            </span>
          )}
          {status === 'success' && (
            <span className="text-auth-input-success-icon-color">
              <PassIcon width={19} height={15} color="currentColor"></PassIcon>
            </span>
          )}
        </span>
        {visibleOption && (
          <div className="absolute left-0 top-0 z-[1000] w-full overflow-hidden rounded-[24px] border border-neutral-dark-gray bg-[#fff] pb-[5px] font-next-book text-[21px] text-[#]">
            <div
              className="mx-[20px] flex h-[48px] cursor-pointer items-center justify-between border-b border-b-[#8C8C8C]"
              onClick={() => {
                setVisibleOption(false);
              }}
            >
              <span>{selectLabel}</span>
              <AiFillCaretDown className=" rotate-180 text-[20px] text-neutral-medium-gray" />
            </div>
            <ul className="max-h-[250px] w-full overflow-auto">
              {options.map((v: OptionType) => (
                <li
                  key={v.value}
                  className={`mt-[5px] flex cursor-pointer items-center justify-between px-[20px] leading-[34px] ${
                    value === v.value ? 'bg-neutral-off-white' : ''
                  }`}
                  onClick={() => {
                    setValue(v.value);
                    setErrorMessage('');
                    setStatus('default');
                    setVisibleOption(false);
                    onChange?.(v.value);
                  }}
                >
                  <span>{v.label}</span>
                  {value === v.value && (
                    <FiCheck className="text-[14px] text-neutral-rich-gray" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {description && (
        <p className="text- ml-[1.5rem]  font-Sofia-Pro-Light-Az text-[1rem] leading-[150%] tracking-[-0.011rem]">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="flex flex-row items-center gap-2 font-Sofia-Pro-Light-Az text-[1rem] leading-[150%] tracking-[-0.011rem] text-auth-input-error-color">
          <WarningIcon width={17} height={16}></WarningIcon>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
