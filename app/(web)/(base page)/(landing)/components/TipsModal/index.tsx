import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import React from 'react';
import { FiX } from 'react-icons/fi';
interface TipsModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const TipsModal: React.FC<TipsModalProp> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} color="#fff" />}
    >
      <div className="flex-col-center w-[90vw] rounded-[10px] bg-neutral-rich-gray py-[30px] font-next-book text-[#fff] shadow-[0px_4px_8px_0_rgba(0,0,0,0.12)]">
        <p className="text-[48px]">😵</p>
        <p className="mt-[25px] font-next-book-bold text-[20px]">
          Laptop is preferred
        </p>
        <p className="mt-[20px] w-[255px] text-[14px]">
          Please learn courses with a laptop or desktop computer for a complete
          and feature-rich experience.
        </p>
        <Button
          className="mt-[20px] h-[34px] w-[140px] bg-[#fff] text-neutral-black"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default TipsModal;
