import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const InviteCodeIcon: React.FC<IconProps> = (props) => {
  const { size = 18, color = '#8c8c8c' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={18} viewBox="0 0 18 18" fill="none">
      <path
        d="M7.76599 2.36543C8.21313 2.07479 8.43669 1.92947 8.67758 1.87293C8.8905 1.82295 9.1121 1.82295 9.32503 1.87293C9.56591 1.92947 9.78948 2.07479 10.2366 2.36543L15.569 5.83145C15.7574 5.95392 15.8516 6.01516 15.9198 6.09684C15.9803 6.16915 16.0257 6.25279 16.0533 6.34285C16.0846 6.4446 16.0846 6.55696 16.0846 6.78169V11.975C16.0846 13.1651 16.0846 13.7601 15.853 14.2147C15.6493 14.6146 15.3242 14.9396 14.9244 15.1434C14.4698 15.375 13.8747 15.375 12.6846 15.375H5.31797C4.12786 15.375 3.5328 15.375 3.07824 15.1434C2.67839 14.9396 2.35331 14.6146 2.14958 14.2147C1.91797 13.7601 1.91797 13.1651 1.91797 11.975V6.78169C1.91797 6.55696 1.91797 6.4446 1.94926 6.34285C1.97695 6.25279 2.02234 6.16915 2.08276 6.09684C2.15102 6.01516 2.24523 5.95393 2.43365 5.83145L7.76599 2.36543Z"
        fill={color}
      />
      <path
        d="M7.76599 9.96786L2.64892 6.64176C2.40531 6.48341 2.2835 6.40424 2.24131 6.30383C2.20445 6.21609 2.20445 6.1172 2.24131 6.02945C2.2835 5.92905 2.40531 5.84987 2.64892 5.69153L7.76599 2.36543C8.21313 2.07479 8.43669 1.92947 8.67758 1.87293C8.8905 1.82295 9.1121 1.82295 9.32503 1.87293C9.56591 1.92947 9.78948 2.07479 10.2366 2.36543L15.3537 5.69153C15.5973 5.84987 15.7191 5.92905 15.7613 6.02945C15.7982 6.1172 15.7982 6.21609 15.7613 6.30383C15.7191 6.40424 15.5973 6.48341 15.3537 6.64176L10.2366 9.96786C9.78948 10.2585 9.56591 10.4038 9.32503 10.4604C9.1121 10.5103 8.8905 10.5103 8.67758 10.4604C8.43669 10.4038 8.21313 10.2585 7.76599 9.96786Z"
        fill={color}
      />
      <path
        d="M1.91797 6.1665L9.0013 10.4165L16.0846 6.1665"
        stroke="#F4F4F4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="6.875" y1="5.26221" x2="11.125" y2="5.26221" stroke="#F4F4F4" />
      <line x1="9.19531" y1="3.3335" x2="9.19531" y2="7.5835" stroke="#F4F4F4" />
    </svg>
  );
};
export default InviteCodeIcon;
