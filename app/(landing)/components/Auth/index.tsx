'use client';
import { AppRootState } from '@/store/redux';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from './ChangePassword';
import EmailVerify from './EmailVerify';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';
import VerifyConfirmed from './VerifyConfirmed';
import CheckInviteCode from './CheckInviteCode';
import { useSearchParams } from 'next/navigation';

interface AuthProps {}

const Auth: FC<AuthProps> = (props) => {
  const query = useSearchParams();
  const dispatch = useDispatch();
  const loginRouteType = useSelector((state: AppRootState) => {
    return state.user.loginRouteType;
  });

  useEffect(() => {
    const type = query.get('type');
    if (type) {
      dispatch(setUnLoginType(type));
    } else {
      dispatch(setUnLoginType(UnLoginType.LOGIN));
    }
  }, []);

  if (query.get('state')) {
    return <VerifyConfirmed></VerifyConfirmed>;
  }
  switch (loginRouteType.type) {
    case UnLoginType.EMAIL_VERIFY:
      return <EmailVerify></EmailVerify>;
    case UnLoginType.FORGOT_PASSWORD:
      return <ForgotPassword></ForgotPassword>;
    case UnLoginType.CHANGE_PASSWORD:
      return <ChangePassword></ChangePassword>;
    case UnLoginType.VERIFYING:
      return <VerifyConfirmed></VerifyConfirmed>;
    case UnLoginType.INVITE_CODE:
      return <CheckInviteCode></CheckInviteCode>;
    case UnLoginType.SIGN_UP:
      return <SignUp></SignUp>;
    case UnLoginType.LOGIN:
    default:
      return <Login></Login>;
  }
};

export default Auth;