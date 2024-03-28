import { FC } from 'react';
import { Metadata } from 'next';
import HackathonIdPage from '../components/HackthonId';
import { getHackathonById } from '@/service/cach/resource/hackathon';
import { isUuid } from '@/helper/utils';
import { permanentRedirect } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';

interface HackathonIdProps {
  params: {
    hackathonId: string;
  };
}

export async function generateMetadata({
  params
}: HackathonIdProps): Promise<Metadata> {
  const hackathon = await getHackathonById(params.hackathonId);
  return {
    title: hackathon.name,
    description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io/hackathon/${params.hackathonId}`
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({
  params
}: HackathonIdProps) {
  const hackathon = await getHackathonById(params.hackathonId);
  if (isUuid(params.hackathonId)) {
    permanentRedirect(`${MenuLink.HACKATHON}/${hackathon.alias}`);
  }
  return (
    <>
      <HackathonIdPage hackathon={hackathon} />
    </>
  );
};

export default HackathonId;
