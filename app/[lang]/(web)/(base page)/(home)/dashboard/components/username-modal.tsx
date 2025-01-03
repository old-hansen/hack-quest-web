'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Common/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import Button from '@/components/Common/Button';
import html2canvas from 'html2canvas';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { errorMessage } from '@/helper/ui';

export function UsernameModal() {
  const router = useRouter();
  const { ecosystemId } = useParams<{ ecosystemId: string }>();
  const queryClient = useQueryClient();
  const [username, setUsername] = React.useState('');

  const [userCertificateInfo, setUserCertificateInfo] = React.useState<UserCertificateInfo>();
  const { open, type, data, onOpen, onClose } = useCertificateModal();
  const isOpen = open && type === 'username';
  const container = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const mutation = useMutation({
    mutationKey: ['generateCertificate'],
    mutationFn: (id: string) => webApi.campaignsApi.crateCertificate(id, { username }),
    onError: (error, variables, context) => errorMessage(error)
  });

  const { mutateAsync, isPending: claimLoading } = useMutation({
    mutationKey: ['claimCertificate'],
    mutationFn: ({ id }: { id: string }) => webApi.ecosystemApi.claimCertificateOverride(id)
  });

  const createCertificate = async () => {
    let error = true;
    let count = 0;
    while (error) {
      try {
        const canvas = await html2canvas(container.current!, {
          useCORS: true
        });

        // canvas.toBlob((blob) => {
        //   if (!blob) return;
        //   const file = new File([blob], 'certificate.png', { type: blob.type });
        //   const formData = new FormData();
        //   formData.append('file', file);
        //   mutateAsync({ id: ecosystemId, formData }).then((res) => {
        //     error = false;
        //     queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        //   });
        // });
      } catch (err) {}
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const certificateInfo = await mutation.mutateAsync(data?.certificationId);
    setUserCertificateInfo(certificateInfo);
    data.certification = certificateInfo;

    setUsername('');
    onClose();
    setLoading(false);
    mutateAsync({ id: ecosystemId }).then((res) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile', 'userLearnedCount'] });
    });
    router.refresh();
    setTimeout(() => {
      onOpen('mint', data);
    }, 1000);
    // createCertificate();
  }

  React.useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      // Cancel the event as stated by the standard.
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', beforeUnload);

    return window.removeEventListener('beforeunload', beforeUnload);
  }, []);

  return (
    <>
      <Modal open={isOpen} onClose={() => {}}>
        <div className="relative flex w-[900px] flex-col rounded-3xl bg-neutral-white px-12 pb-8 pt-12">
          <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
            <XIcon size={24} />
          </button>
          <div className="mx-auto flex items-center gap-2">
            <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
            <h1 className="text-2xl font-bold text-neutral-off-black">Congratulations! You’re a {data?.label}</h1>
          </div>
          <div className="mt-6">
            <form className="flex w-full flex-col" onSubmit={handleSubmit}>
              <label htmlFor="name" className="text-neutral-rich-gray">
                Enter Your Name to Claim Certificate
              </label>
              <input
                id="name"
                type="text"
                autoComplete="off"
                className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray transition-colors focus:ring-neutral-medium-gray"
                value={username}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="mb-6 text-sm text-neutral-medium-gray">
                Once you claim the certificate, you’ll not be able to change your name
              </p>
              <Button
                disabled={!username}
                htmlType="submit"
                loading={loading}
                className="mx-auto h-12 w-64 rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
              >
                {mutation.isPending ? 'creating...' : claimLoading ? 'claim...' : 'continue'}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      {/* <div ref={container} className="fixed -left-[999999px] top-0 z-[99999]">
        {data?.certification?.template && (
          <CertificateRenderer template={data.certification.template as string} certificateInfo={userCertificateInfo} />
        )}
      </div> */}
    </>
  );
}
