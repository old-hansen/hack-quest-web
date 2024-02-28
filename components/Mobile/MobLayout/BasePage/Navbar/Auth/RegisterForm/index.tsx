import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/Common/Checkbox';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
import { FC, useState } from 'react';
import WhiteListModal from '../WhiteListModal';
import { AuthType, useUserStore } from '@/store/zustand/userStore';

interface RegisterFormProps {
  email: string;
  onBack: VoidFunction;
  inviteCode?: string;
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onBack } = props;
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    reenterPassword: string;
    inviteCode: string | undefined;
  }>({
    email: props.email,
    password: '',
    inviteCode: props.inviteCode,
    reenterPassword: ''
  });

  const setAuthType = useUserStore((state) => state.setAuthType);

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
  const [loading, setLoading] = useState(false);
  const { run: onRegister } = useDebounceFn(
    () => {
      BurialPoint.track('signup-注册按钮点击');
      if (!acceptConditions) {
        BurialPoint.track('signup-没有同意隐私策略');
        setAcceptErrorMessage(true);
        return;
      }
      setLoading(true);
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            BurialPoint.track('signup-发送注册邮件');
            const res = await webApi.userApi.userRegister(formData);
            BurialPoint.track('signup-注册邮件发送成功');
            setAuthType(AuthType.EMAIL_VERIFY);
          } catch (e: any) {
            BurialPoint.track('signup-注册邮件发送失败', { message: e?.msg });
            console.log(e);
            if (e?.code === 400) setShowWhiteListModal(true);
            else message.error(e?.msg);
          }
          setLoading(false);
        } else {
          const status: any = { ...formState };
          errors.map((error) => {
            status[error.field as string] = {
              status: 'error',
              errorMessage: error.message
            };
          });
          setFormState(status);
          setLoading(false);
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="flex h-full w-full flex-col justify-between px-5">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[24px]">
        <div>
          <Input
            labelClassName="text-white font-GT-Walsheim-Trial"
            label="Password"
            type="password"
            name="password"
            source="mantle"
            placeholder="8+characters with a mix of letters & numbers"
            theme="dark"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            delay={500}
            isMobile
            rules={{
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message: '8 or more characters with a mix of letters & numbers'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          ></Input>
        </div>
        <div>
          <Input
            labelClassName="text-white font-GT-Walsheim-Trial"
            label="Re-enter password"
            type="password"
            theme="dark"
            placeholder="Confirm my password"
            name="reenterPassword"
            isMobile
            source="mantle"
            state={formState.reenterPassword.status as any}
            errorMessage={formState.reenterPassword.errorMessage}
            delay={500}
            rules={[
              // {
              //   type: 'string',
              //   required: true,
              //   pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              //   message:
              //     'Use 8 or more characters with a mix of letters & numbers'
              // },
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
        </div>
        <div className="flex flex-col gap-[.5rem]">
          <div className="flex items-center gap-[.75rem]">
            <Checkbox
              outClassNames={`${
                acceptConditions
                  ? 'border-neutral-off-white'
                  : 'border-neutral-medium-gray'
              }`}
              isCircle={true}
              innerClassNames="bg-neutral-off-white"
              onChange={(value) => {
                if (value) {
                  setAcceptErrorMessage(false);
                }
                setAcceptCondition(value);
              }}
            ></Checkbox>

            <p
              className={cn(
                `body-s text-neutral-medium-gray`,
                acceptErrorMessage ? 'text-status-error-dark ' : '',
                acceptConditions ? 'text-neutral-off-white' : ''
              )}
            >
              {`I agree with HackQuest's Terms of Service,  `}
              <Link
                href={'/hackquest/privacy-policy'}
                target="_blank"
                className="underline"
              >
                Privacy Policy.
              </Link>
            </p>
          </div>
        </div>

        {/* <Button
          onClick={onBack}
          block
          className="
            
            text-[1.125rem]
            border
            bg-transparent
            text-neutral-white hover:text-auth-ghost-button-text-hover-color
            border-neutral-white hover:border-auth-ghost-button-border-hover-color
          "
        >
          Back
        </Button> */}
      </div>
      <Button
        onClick={onRegister}
        block
        type="mantle"
        loading={loading}
        disabled={loading}
        icon={<RightArrowIcon></RightArrowIcon>}
        iconPosition="right"
        className="gap-[15px] rounded-[10px] font-GT-Walsheim-Trial text-[18px] leading-[140%]"
      >
        Continue
      </Button>
      <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal>
    </div>
  );
};

export default RegisterForm;
