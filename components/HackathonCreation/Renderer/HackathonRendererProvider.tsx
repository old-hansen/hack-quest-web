import { getHackathonRegisterSteps } from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/register/components/constants';
import { HackathonRegisterStateType } from '@/app/[lang]/(web)/(other)/form/web3mooc/register/type';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { CustomComponentConfig, PresetComponentConfig } from '../type';
import { PresetComponentMap } from '..';
import { z } from 'zod';

interface HackathonRenderProviderProps {
  children: ReactNode;
  simpleHackathonInfo: SimpleHackathonInfo;
  hackathonSteps: ReturnType<typeof getHackathonRegisterSteps>;
  onNext: (state?: Partial<HackathonRegisterStateType | any>) => void;
  onBack: VoidFunction;
}

type HackathonRendererContextType = Omit<HackathonRenderProviderProps, 'children' | 'simpleHackathonInfo'> & {
  simpleHackathonInfo: SimpleHackathonInfo | null;
};

const HackathonRendererContext = createContext<HackathonRendererContextType>({
  simpleHackathonInfo: null,
  hackathonSteps: [],
  onNext: () => {},
  onBack: () => {}
});

export const HackathonRendererProvider: FC<HackathonRenderProviderProps> = ({ children, ...rest }) => {
  return <HackathonRendererContext.Provider value={rest}>{children}</HackathonRendererContext.Provider>;
};

export const useHackathonConfig = (): HackathonRendererContextType => {
  const context = useContext(HackathonRendererContext);

  return context;
};

export const useValidatorFormSchema = (sectionConfig: (PresetComponentConfig<{}, {}> | CustomComponentConfig)[]) => {
  const formSchema = useMemo(() => {
    let schema = {};

    sectionConfig.forEach((cfg) => {
      const fullConfig = PresetComponentMap[cfg.type];
      if (fullConfig) {
        const mergeConfig = { ...fullConfig, ...cfg };
        const validatorRecord = fullConfig.getValidator(mergeConfig);
        schema = { ...schema, ...validatorRecord };
      } else {
        let validator = z.string().min(cfg.optional ? 0 : 1);
        schema = { ...schema, [cfg.id]: cfg.optional ? validator.optional() : validator };
      }
    });
    return z.object(schema);
  }, []);

  return formSchema;
};
