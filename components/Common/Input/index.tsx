import { cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule, Rules } from 'async-validator';
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import PassIcon from '../Icon/Pass';
import CloseIcon from '../Icon/Close';
import WarningIcon from '../Icon/Warning';

interface InputProps {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  prefix?: ReactNode;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  delay?: number;
  defaultValue?: string;
  clear?: boolean;
  showVisibleIcon?: boolean;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

const Input = forwardRef<
  InputRef,
  InputProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const {
    label,
    type,
    placeholder,
    prefix,
    description,
    state: propsState,
    errorMessage: propsErrorMessage,
    name,
    rules,
    delay = 0,
    className,
    onChange,
    defaultValue = '',
    clear = false,
    showVisibleIcon = type === 'password' ? true : false,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState(propsState);
  const [errorMessage, setErrorMessage] = useState('');
  const descriptor: Rules = {
    [name]: rules || {}
  };
  const validator = new Schema(descriptor);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setStatus(propsState);
  }, [propsState]);

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

  const { run } = useDebounceFn(
    (e) => {
      if (rules) {
        validator.validate({ [name]: e.target.value }, (errors, fields) => {
          if (errors && errors[0]) {
            setStatus('error');
            setErrorMessage(errors[0].message || '');
          } else {
            setStatus('success');
            setErrorMessage('');
          }
        });
      }

      onChange?.(e);
    },
    { wait: delay }
  );

  return (
    <div className="flex flex-col gap-[0.75rem]">
      <p className="text-text-default-color text-[1rem] font-next-book leading-[125%] tracking-[-0.011rem]">
        {label}
      </p>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(
            `w-[33.0625rem] border border-solid border-[#5B5B5B] outline-none bg-transparent px-[1.5rem] py-[1.12rem] rounded-[2.5rem] text-[#5B5B5B] text-[1.25rem] font-next-book leading-[118.5%] caret-[#5B5B5B] hover:border-white focus:border-white focus:text-text-default-color`,
            status === 'success'
              ? 'border-[#9EFA13] focus:border-[#9EFA13]'
              : '',
            status === 'error' ? 'border-[#FF4747] focus:border-[#FF4747]' : '',
            className
          )}
          onChange={(e) => {
            setValue(e.target.value);
            run(e);
          }}
          {...rest}
        />

        <span className="absolute right-[1.4375rem] top-[50%] -translate-y-[50%]">
          {clear && value && (
            <span
              className="text-red-500 flex justify-center items-center cursor-pointer"
              onClick={() => setValue('')}
            >
              <CloseIcon size={20}></CloseIcon>
            </span>
          )}
          {status === 'success' ? (
            <PassIcon width={19} height={15}></PassIcon>
          ) : null}
        </span>
      </div>
      {description && (
        <p className="ml-[1.5rem] text-[#676767] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="text-[#FF4747] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az flex flex-row items-center gap-2">
          <WarningIcon width={17} height={16}></WarningIcon>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
