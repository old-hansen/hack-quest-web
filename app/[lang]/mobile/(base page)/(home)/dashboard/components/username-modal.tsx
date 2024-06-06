'use client';

import * as React from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import webApi from '@/service';

function ClaimCertificateForm() {
  const [name, setName] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="mt-6 flex-1">
      <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-neutral-rich-gray">
          Enter Your Name to Claim Certificate
        </label>
        <input
          id="name"
          type="text"
          className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm text-neutral-medium-gray">
          Once you claim the certificate, you’ll not be able to change your name
        </p>
        <button
          disabled={!name}
          type="submit"
          className="mt-auto h-12 w-full rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
        >
          continue
        </button>
      </form>
    </div>
  );
}

export function UsernameModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [username, setUsername] = React.useState('');

  const { open, type, data, onOpen, onClose } = useCertificateModal();

  const isOpen = open && type === 'username';

  const mutation = useMutation({
    mutationKey: ['claimCertificate'],
    mutationFn: (id: string) => webApi.campaignsApi.claimCertificate({ username }, id)
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutateAsync(data?.certificationId).then(() => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      setUsername('');
      onClose();
      setTimeout(() => {
        onOpen('mint', data);
      }, 1000);
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)]">
          <div className="relative flex h-full flex-col bg-neutral-white px-5 py-6">
            <button className="absolute right-4 top-6 outline-none" onClick={() => onClose()}>
              <XIcon size={24} />
            </button>
            <div className="mt-11 flex flex-col gap-2">
              <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
              <h1 className="text-lg font-bold text-neutral-off-black sm:text-2xl">
                Congratulations! You’re a {data?.label}
              </h1>
            </div>
            <div className="mt-6 flex-1">
              <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-neutral-rich-gray">
                  Enter Your Name to Claim Certificate
                </label>
                <input
                  id="name"
                  type="text"
                  className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-sm text-neutral-medium-gray">
                  Once you claim the certificate, you’ll not be able to change your name
                </p>
                <button
                  disabled={!username}
                  type="submit"
                  className="mt-auto h-12 w-full rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
                >
                  continue
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}