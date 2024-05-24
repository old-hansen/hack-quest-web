import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import { HackathonCountdown } from '@/components/hackathon/hackathon-countdown';

export function HackathonCard() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-neutral-white p-4">
      <Image src="/images/navbar/my-hackathon.svg" width={64} height={64} alt="hackathon" />
      <div>
        <h1 className="font-next-book-bold text-lg font-bold">Linea Mini-hack -May</h1>
        <div className="inline-flex items-center justify-center self-start rounded-[0.5rem] border border-status-success-dark px-2 py-0.5 text-xs font-bold uppercase text-status-success-dark">
          ongoing
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-light text-neutral-rich-gray">Submission Closes in</h4>
        <HackathonCountdown targetDate="2024-06-01T00:00:00.000Z" className="text-lg" />
      </div>
      <Link href="/hackathon/explore">
        <div className="inline-flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-neutral-off-black">View hackathon</span>
          <MoveRightIcon size={16} />
        </div>
      </Link>
    </div>
  );
}
