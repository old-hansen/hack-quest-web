import Button from '@/components/v2/Common/Button';
import { FC, ReactNode } from 'react';

interface NotCertifiedProps {
  onClose: VoidFunction;
}

const NotCertified: FC<NotCertifiedProps> = (props) => {
  const { onClose } = props;
  return (
    <div className="flex-1">
      <h3 className="font-next-poster-Bold text-[28px] text-[#131313] tracking-[1.68px]">
        Your Web3 Certificate Awaits!
      </h3>
      <p className="mt-[20px] font-next-book text-[16px] leading-[160%] tracking-[0.32px] text-[#0B0B0B]">
        Keep pushing forward, mastering each section, and the ultimate reward—a
        distinguished certificate—will be a testament to your dedication and
        expertise in the exciting realm of decentralized development!
      </p>
      <div className="flex gap-x-[10px] mt-[40px]">
        <Button
          type="primary"
          disabled
          className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] opacity-40"
        >
          Claim Certificate
        </Button>
        <Button
          ghost
          className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] border-[#0B0B0B]"
          onClick={() => onClose()}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default NotCertified;