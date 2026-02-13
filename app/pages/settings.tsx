import { Link } from 'react-router';

import { PlusIcon } from 'lucide-react';

import { BrokerTabs } from '@/components/settings/broker-tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SETTINGS_CONSTANTS } from '@/constants/strings';

import type { Route } from './+types/settings';

export function meta({}: Route.MetaArgs): Route.MetaDescriptors {
  return [
    { title: SETTINGS_CONSTANTS.META_TITLE },
    { name: 'description', content: SETTINGS_CONSTANTS.META_DESCRIPTION },
  ];
}

export default function Settings() {
  return (
    <section className='space-y-4'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-bold lg:text-2xl 2xl:text-3xl'>{SETTINGS_CONSTANTS.TITLE}</h2>
          <p className='text-muted-foreground'>{SETTINGS_CONSTANTS.DESCRIPTION}</p>
        </div>

        <Button asChild className='mt-auto'>
          <Link to='/settings/brokers/new'>
            <PlusIcon className='size-4' />
            <span className='mt-px leading-none'>{SETTINGS_CONSTANTS.ADD_BROKER_LABEL}</span>
          </Link>
        </Button>
      </header>
      <Separator className='mt-2' />
      <BrokerTabs />
    </section>
  );
}
