import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightIcon from '@/components/Common/Icon/Right';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { useDebounce, useDebounceFn } from 'ahooks';
import { Radio, message } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import WhiteListModal from '../WhiteListModal';

// const CustomButton: FC<ButtonProps> = (props) => {
//   const { children } = props;
//   return (
//     <Button
//       padding="px-[3rem] py-[1.25rem]"
//       fontStyle="Inter font-normal font-next-book"
//       textStyle="text-[.875rem] text-white leading-[1.25rem]"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };
interface RegisterFormProps {
  // children: ReactNode;
  email: string;
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    reenterPassword: string;
  }>({
    email: props.email,
    password: '',
    reenterPassword: ''
  });

  const [formState, setFormState] = useState({
    // email: {
    //   status: 'default',
    //   errorMessage: ''
    // },
    password: {
      status: 'default',
      errorMessage: ''
    },
    reenterPassword: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { validator } = useValidator([
    // 'registerEmail',
    'password',
    'reenterPassword'
  ]);

  const [acceptConditions, setAcceptCondition] = useState(false);
  const [acceptErrorMessage, setAcceptErrorMessage] = useState(false);
  const [showWhiteListModal, setShowWhiteListModal] = useState(false);
  const router = useRouter();

  const { run: onRegister } = useDebounceFn(
    () => {
      if (!acceptConditions) {
        setAcceptErrorMessage(true);
        return;
      }
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            const res = await webApi.userApi.userRegister(formData);
            router.push('/auth/email-verify');
          } catch (e: any) {
            if (e?.code === 400) setShowWhiteListModal(true);
            else message.error(e?.msg);
          }
        } else {
          const status: any = { ...formState };
          errors.map((error) => {
            status[error.field as string] = {
              status: 'error',
              errorMessage: error.message
            };
          });
          setFormState(status);
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="w-[48.8125rem] h-full flex justify-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex flex-col gap-[2rem] mt-[12.25rem]">
        <p className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
          Register
        </p>

        {/* <Input
          label="Email"
          type="email"
          placeholder="Email"
          name="email"
          state={formState.email.status as any}
          errorMessage={formState.email.errorMessage}
          delay={500}
          rules={[
            {
              type: 'string',
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Incorrect Email'
            },
            {
              asyncValidator(rule, value, callback, source, options) {
                // 验证邮箱是否存在
                return new Promise((resolve, reject) => {
                  webApi.userApi
                    .checkEmailExists(value)
                    .then((res) => {
                      // onStatusChange(false);
                      reject(
                        <div>
                          <p>
                            Email already exists, please register with another
                            email, or
                          </p>
                          <p>
                            <Link href="/auth/login">
                              <span className="text-white">Login now</span>
                            </Link>
                          </p>
                        </div>
                      );
                    })
                    .catch((e) => {
                      // onStatusChange(true);
                      resolve();
                    });
                });
              }
            }
          ]}
          onChange={(e) => {
            setFormData({
              ...formData,
              email: e.target.value
            });
          }}
        ></Input> */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="8+characters with a mix of letters & numbers"
          description="Use 8 or more characters with a mix of letters & numbers"
          state={formState.password.status as any}
          errorMessage={formState.password.errorMessage}
          delay={500}
          rules={{
            type: 'string',
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
            message: 'Incorrect Password'
          }}
          onChange={(e) => {
            setFormData({
              ...formData,
              password: e.target.value
            });
          }}
        ></Input>
        <Input
          label="Re-enter password"
          type="password"
          placeholder="Password"
          name="reenterPassword"
          state={formState.reenterPassword.status as any}
          errorMessage={formState.reenterPassword.errorMessage}
          delay={500}
          rules={[
            {
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message:
                'Use 8 or more characters with a mix of letters & numbers'
            },
            {
              type: 'string',
              message: 'Those passwords didn’t match. Try again.',
              validator(rule, value) {
                return value === formData.password;
              }
            }
          ]}
          onChange={(e) => {
            setFormData({
              ...formData,
              reenterPassword: e.target.value
            });
          }}
        ></Input>
        <div className="flex flex-col gap-[.5rem]">
          <div className="flex gap-[0.5rem] text-[#ACACAC] font-Sofia-Pro-Light-Az font-light leading-[150%] tracking-[-0.011rem]">
            <span>See our</span>
            <Link href={'/hackquest/privacy-policy'} target="_blank">
              <span className="text-[#F8F8F8] font-semibold">
                Privacy Policy
              </span>
            </Link>
            <span>for more details</span>
          </div>
          <div className="flex gap-[.75rem]">
            <Checkbox
              onChange={(value) => {
                if (value) {
                  setAcceptErrorMessage(false);
                }
                setAcceptCondition(value);
              }}
            ></Checkbox>

            <p
              className={cn(
                `text-[#676767] text-[1rem] font-Sofia-Pro-Light-Az tracking-[-0.011rem]`,
                acceptErrorMessage ? 'text-[#FF4747]' : ''
              )}
            >
              I have red and accept the Terms and Conditions
            </p>
          </div>
        </div>
        <Button
          onClick={onRegister}
          block
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          type="primary"
        >
          Create Account
        </Button>
      </div>
      <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal>
    </div>
  );
};

export default RegisterForm;
