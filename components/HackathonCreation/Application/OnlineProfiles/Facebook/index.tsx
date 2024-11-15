import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface FacebookProps {
  form: any;
  config: CustomComponentConfig;
}

const Facebook: FC<FacebookProps> = ({ config: propConfig, form }) => {
  const config = {
    ...propConfig,
    type: 'input'
  };
  return renderFormComponent(config as CustomComponentConfig, form);
};

Facebook.displayName = 'Facebook';

export const FacebookConfig: PresetComponentConfig<FacebookProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: Facebook.displayName,
  component: Facebook,
  optional: false,
  property: {
    label: 'Facebook',
    placeholder: 'Enter a Facebook Account',
    name: 'facebook'
  },
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Facebook</span>
        <span className="body-m text-neutral-off-black">{info.facebook ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      facebook: config.optional ? validator.optional() : validator
    };
  }
};

export default FacebookConfig;
