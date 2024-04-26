import { cn } from '@/helper/utils';
import { UseFormReturn } from 'react-hook-form';
import { InfoFormSchema } from '..';

interface ProjectTypeRadioProps {
  form: UseFormReturn<InfoFormSchema, any, undefined>;
  tracks: string[];
}

const ProjectTrackRadio = ({ form, tracks }: ProjectTypeRadioProps) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="body-m text-left text-neutral-rich-gray">Which Hackathon Track Do You Belong To</p>
      <div className="flex w-full justify-between gap-5">
        {tracks.map((track) => {
          return (
            <div
              key={track}
              onClick={() => {
                form.setValue('track', track);
                form.trigger('track');
              }}
              className={cn(
                `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
                form.watch('track') === track
                  ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
                  : ''
              )}
            >
              <span>{track}</span>
            </div>
          );
        })}
        {/* <div
          onClick={() => {
            form.setValue('track', 'Fully On-chain Game');
            form.trigger('track');
          }}
          className={cn(
            `body-m flex h-[50px]  w-full cursor-pointer items-center justify-center gap-3 rounded-[8px] border-[3px] border-neutral-off-white px-5 py-3`,
            form.watch('track') === 'Fully On-chain Game'
              ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_8px_0px_rgba(249,216,28,0.30)]'
              : ''
          )}
        >
          <span>Fully On-chain Game</span>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectTrackRadio;