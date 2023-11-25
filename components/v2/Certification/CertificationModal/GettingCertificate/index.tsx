import Button from '@/components/v2/Common/Button';
import Image from 'next/image';
import { FC, ReactNode, useState } from 'react';
import { RiShareBoxLine } from 'react-icons/ri';
import TestImage from '../../CertificationCard/certificate.png';
import Tooltip from '@/components/v2/Common/Tooltip';
import {
  ShareWrap,
  shareList
} from '@/components/v2/Home/InviteCodeCard/constant';
interface GettingCertificateProps {}

const badge = (
  <svg
    width="53"
    height="70"
    viewBox="0 0 53 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.4489 44.4586L21.6389 40.5269L10.6508 59.5588L14.62 68.411L28.4489 44.4586Z"
      fill="#FDEAAA"
      stroke="#DADADA"
      stroke-linecap="square"
    />
    <path
      d="M14.8289 36.5951L21.6389 40.5269L10.6508 59.5588L1 60.5475L14.8289 36.5951Z"
      fill="#FCC409"
      stroke="#DADADA"
      stroke-linecap="square"
    />
    <path
      d="M24.5406 44.4586L31.3506 40.5269L42.3387 59.5588L38.3695 68.411L24.5406 44.4586Z"
      fill="#FCC409"
      stroke="#DADADA"
    />
    <path
      d="M38.1606 36.5951L31.3506 40.5269L42.3387 59.5588L51.9895 60.5475L38.1606 36.5951Z"
      fill="#FDEAAA"
      stroke="#DADADA"
      stroke-linecap="round"
    />
    <circle
      cx="26.4856"
      cy="24.0344"
      r="23.4455"
      fill="#FFD850"
      stroke="#DADADA"
    />
    <path
      d="M33.789 16.4553L33.7918 16.4526C33.1338 15.8126 32.3922 15.2583 31.5848 14.8079C30.0778 13.967 28.3417 13.4877 26.493 13.4871L16.477 13.9468L16.016 23.9639C16.0169 26.86 17.201 29.4892 19.1132 31.3885L19.22 31.4945L19.2172 31.4973C19.6529 31.9178 20.1249 32.3009 20.6281 32.6413C22.2999 33.7724 24.3157 34.4332 26.4862 34.4339L36.5017 33.9741L36.9628 23.957C36.9619 21.0756 35.7899 18.4585 33.895 16.5614L33.789 16.4553Z"
      fill="#3E3E3E"
      stroke="#3E3E3E"
      stroke-width="0.3"
    />
    <path
      d="M26.5019 30.1138C30.0043 30.1138 32.6559 27.5829 32.6559 23.9597C32.6559 20.3365 30.0043 17.8056 26.5019 17.8056C22.9995 17.8056 20.3478 20.3365 20.3478 23.9597C20.3478 27.5829 22.9995 30.1138 26.5019 30.1138Z"
      fill="#FFD850"
      stroke="#3E3E3E"
      stroke-width="0.3"
    />
  </svg>
);

const GettingCertificate: FC<GettingCertificateProps> = (props) => {
  const [showShare, setShowShare] = useState(false);
  return (
    <div className="flex-1">
      <div className="flex items-center gap-x-5 h-fit">
        <div>{badge}</div>
        <h3 className="font-next-poster-Bold leading-[125%] text-[28px] tracking-[1.68px] text-[#131313]">
          Congratulations on getting your certificate!
        </h3>
      </div>

      <p className="mt-5 text-[#0B0B0B] font-next-book text-[16px] leading-[160%] tracking-[0.32px]">
        {`You’ve reached a significant milestone in your Web3 learning journey!
          Proudly share your well-deserved certificate with others as a testament
          to your expertise in the dynamic world of decentralized technology.`}
      </p>

      <div
        className="flex gap-x-[10px] mt-[40px]"
        onMouseLeave={() => {
          if (showShare) setShowShare(false);
        }}
      >
        <Tooltip
          show={showShare}
          // customize={true}
          title={
            <div className="flex gap-[20px]">
              {shareList('').map((item) => {
                return (
                  <ShareWrap
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    icon={item.icon}
                    props={item.props}
                    showName={false}
                    iconSize={24}
                  ></ShareWrap>
                );
              })}
            </div>
          }
          placement="bottom"
          className="-mt-[6px]"
        >
          <Button
            type="primary"
            icon={<RiShareBoxLine />}
            iconPosition="left"
            className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px]"
            onClick={() => setShowShare(true)}
          >
            Share
          </Button>
        </Tooltip>
        <Button
          ghost
          className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] border-[#0B0B0B]"
        >
          Check Profile
        </Button>
      </div>
    </div>
  );
};

export default GettingCertificate;