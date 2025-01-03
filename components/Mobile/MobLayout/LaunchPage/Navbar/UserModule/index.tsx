import { BurialPoint } from '@/helper/burialPoint';
import { FC, Suspense, useContext } from 'react';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
import { itemVariants } from '../constant';
import { BiUser, BiLockAlt, BiLogInCircle } from 'react-icons/bi';
import Link from 'next/link';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { V2_LANDING_PATH, isNoNeedUserInfo } from '@/constants/nav';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { NavType } from '@/components/Mobile/MobLayout/constant';
import Intl from '@/components/Mobile/Intl';
import { useRouter } from 'next/navigation';
import { LoginResponse } from '@/service/webApi/user/type';

interface UserModuleProps {
  changeNavType: (type: NavType) => void;
  toggleOpen: VoidFunction;
  userInfo: Partial<LoginResponse> | null;
}

const UserModule: FC<UserModuleProps> = ({ changeNavType, toggleOpen, userInfo }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { setAuthType, userSignOut } = useUserStore(
    useShallow((state) => ({
      setAuthType: state.setAuthType,
      userSignOut: state.userSignOut
    }))
  );
  const pathname = useCustomPathname();
  const router = useRouter();
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);

  const { redirectToUrl } = useRedirect();

  const signOut = () => {
    setAuthType(AuthType.LOGIN);
    userSignOut();
    toggleOpen();
    BurialPoint.track('登出');
    if (isNoNeedUserInfo(pathname)) {
      window.location.reload();
    } else {
      redirectToUrl(V2_LANDING_PATH);
    }

    router.refresh();
  };

  const arrowIcon = (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5L1 3.5ZM13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM1 4.5L13 4.5V3.5L1 3.5L1 4.5Z"
        fill="black"
      />
    </svg>
  );

  if (!userInfo) {
    return (
      <div className="body-l w-full capitalize text-neutral-off-black">
        <motion.div variants={itemVariants} className="flex items-center justify-between gap-2 px-2 py-3">
          <span className="">{t('changeLanguage')}</span>
          <Suspense fallback={null}>
            <Intl />
          </Suspense>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 p-2"
          onClick={() => {
            setAuthType(AuthType.LOGIN);
            changeNavType(NavType.AUTH);
          }}
        >
          <span>{t('login')}</span> {arrowIcon}
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 p-2"
          onClick={() => {
            setAuthType(AuthType.SIGN_UP);
            changeNavType(NavType.AUTH);
          }}
        >
          <span>{t('signUp')}</span> {arrowIcon}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="body-l w-full capitalize text-neutral-off-black">
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-2 px-2 py-3"
        onClick={() => {
          // message.error(
          //   'Do not support mobile terminal to change the password, please go to the PC terminal operation.'
          // );
          // return;
          // BurialPoint.track('settings');
          // setTipsModalOpenState(true);
        }}
      >
        {/* <span>
          <BiLockAlt size={24}></BiLockAlt>
        </span> */}
        <span className="">{t('changeLanguage')}</span>
        <Suspense fallback={null}>
          <Intl />
        </Suspense>
      </motion.div>
      <Link href={`/user/${userInfo.username}`}>
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 p-2"
          onClick={() => {
            // setAuthType(AuthType.LOGIN);
            // changeNavType(NavType.AUTH);
            // setTipsModalOpenState(true);
            toggleOpen();
          }}
        >
          <span>
            <BiUser size={24}></BiUser>
          </span>
          <span className="">{t('profile')}</span>
        </motion.div>
      </Link>
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 p-2"
        onClick={() => {
          // message.error(
          //   'Do not support mobile terminal to change the password, please go to the PC terminal operation.'
          // );
          // return;
          // BurialPoint.track('settings');
          setTipsModalOpenState(true);
        }}
      >
        <span>
          <BiLockAlt size={24}></BiLockAlt>
        </span>
        <span className="">{t('changePassword')}</span>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 p-2"
        onClick={() => {
          signOut();
        }}
      >
        <span>
          <BiLogInCircle size={24}></BiLogInCircle>
        </span>
        <span className="">{t('signOut')}</span>
      </motion.div>
    </div>
  );
};

export default UserModule;
