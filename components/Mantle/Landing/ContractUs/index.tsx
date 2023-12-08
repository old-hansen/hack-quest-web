import DarkInstagramIcon from '@/components/Common/Icon/DarkInstagram';
import DiscordIcon from '@/components/Common/Icon/Discord';
import LightInstagramIcon from '@/components/Common/Icon/LightInstagram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { ThemeContext } from '@/store/context/theme';
import Link from 'next/link';
import { FC, useContext } from 'react';
interface ContractUsProps {
  // children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

const ContractUs: FC<ContractUsProps> = (props) => {
  const { className, theme = 'light' } = props;

  return (
    <ul
      className={cn(
        `
    flex gap-[1.25rem]
    `,
        className
      )}
    >
      <Link
        href={'https://x.com/hackquest_?s=21&t=kYetGSBybf-ssFBo7GodGA'}
        className="hover:scale-[1.1] cursor-pointer"
        onClick={() => {
          BurialPoint.track('landing-推特按钮点击');
        }}
      >
        <span className="text-text-default-color">
          <TwitterIcon color={theme === 'light' ? 'white' : 'black'} />
        </span>
      </Link>
      <Link
        href={'https://discord.gg/KkAJHPqywn'}
        className="hover:scale-[1.1] cursor-pointer"
        onClick={() => {
          BurialPoint.track('landing-discord按钮点击');
        }}
      >
        <span className="text-text-default-color">
          <DiscordIcon color={theme === 'light' ? 'white' : 'black'} />
        </span>
      </Link>
      <Link
        href={'https://www.instagram.com/_hackquest/'}
        className="hover:scale-[1.1] cursor-pointer"
        onClick={() => {
          BurialPoint.track('landing-instagram按钮点击');
        }}
      >
        <span>
          {theme === 'light' && <DarkInstagramIcon />}
          {theme === 'dark' && <LightInstagramIcon />}
        </span>
      </Link>
    </ul>
  );
};

export default ContractUs;