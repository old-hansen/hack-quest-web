import React from 'react';
import Dot from '../Dot';

interface TitleProp {
  title: string;
  description: string;
}

const Title: React.FC<TitleProp> = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-h3 relative text-neutral-black">
        <span>{title}</span>
        <Dot />
      </h2>
      <p className="body-m mt-[8px] text-neutral-medium-gray">{description}</p>
    </div>
  );
};

export default Title;