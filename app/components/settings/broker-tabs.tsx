import { useCallback, useMemo, useState } from 'react';

import { BanIcon, StarIcon } from 'lucide-react';

import { BrokerChargesTable } from '@/components/settings/broker-charges-table';
import { BrokerTabTrigger } from '@/components/settings/broker-tab-trigger';
import { Badge } from '@/components/ui/badge';
import {
  FolderTabs,
  FolderTabsBody,
  FolderTabsContent,
  FolderTabsList,
  FolderTabsTrigger,
} from '@/components/ui/folder-tabs';
import { COMMON_STRINGS, SETTINGS_CONSTANTS } from '@/constants/strings';
import { getDefaultBrokerConfigs } from '@/lib/helpers/charges';

import type { Broker } from '@/types/charge';

export function BrokerTabs() {
  const defaultBrokers = getDefaultBrokerConfigs();
  const [brokers, setBrokers] = useState<Broker[]>(defaultBrokers);

  const defaultActiveBrokerIdForTabs = useMemo(() => {
    // Quick exit for empty arrays
    if (brokers.length === 0) return undefined;

    // Single pass optimization: Iterate once to find the best candidate
    let firstEnabledId: string | undefined;

    for (const broker of brokers) {
      // PRIORITY 1: The default broker.
      // If found, we can stop searching immediately.
      if (broker.isDefault) return broker.id;

      // PRIORITY 2 Candidate: The *first* enabled broker found.
      // We store it if we haven't found one yet, but keep looping
      // just in case we find an `isDefault` later down the list.
      if (!firstEnabledId && broker.enabled) {
        firstEnabledId = broker.id;
      }
    }

    // Priority 3: Fallback to first enabled found, or just the first item in list
    return firstEnabledId ?? brokers[0]?.id;
  }, [brokers]);

  const handleSetDefault = useCallback(
    (id: string) => {
      // Find the target broker to be set as default
      const targetBroker = brokers.find((b) => b.id === id);

      // Safety checks to prevent setting an invalid default or already default broker
      if (!targetBroker || !targetBroker.enabled || targetBroker.isDefault) return;

      // Update the brokers list to set the new default
      return setBrokers((prev) => prev.map((b) => ({ ...b, isDefault: b.id === id })));
    },
    [brokers, setBrokers],
  );

  const handleToggleBroker = useCallback((id: string) => {
    setBrokers((prev) => {
      // 1. Create the new list with the target broker toggled
      const nextBrokers = prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));

      // 2. Check if we just disabled the broker that was marked as Default
      const justDisabledDefault = nextBrokers.find((b) => b.id === id && !b.enabled && b.isDefault);

      if (justDisabledDefault) {
        // 3. Find the first available ACTIVE broker to be the new successor
        // (Since we already set the target to disabled in step 1, .find() will skip it)
        const newDefault = nextBrokers.find((b) => b.enabled);

        if (newDefault) {
          // 4. Re-map the list to assign the new default
          return nextBrokers.map((b) => ({ ...b, isDefault: b.id === newDefault.id }));
        }

        // Edge Case: If NO brokers are enabled, simply remove the default status from the disabled one
        return nextBrokers.map((b) => ({ ...b, isDefault: false }));
      }

      // 5. Check if we just enabled a broker and it's now the only enabled one
      const targetBroker = nextBrokers.find((b) => b.id === id);
      if (targetBroker?.enabled) {
        const enabledBrokers = nextBrokers.filter((b) => b.enabled);
        if (enabledBrokers.length === 1) {
          // Mark it as default if it's the only enabled broker
          return nextBrokers.map((b) => ({ ...b, isDefault: b.id === id }));
        }
      }

      return nextBrokers;
    });
  }, []);

  return (
    <FolderTabs defaultValue={brokers.length > 0 ? defaultActiveBrokerIdForTabs : undefined}>
      <FolderTabsList>
        {brokers.map((broker) => (
          <FolderTabsTrigger key={broker.id} value={broker.id} destructive={!broker.enabled}>
            <BrokerTabTrigger broker={broker} onSetDefault={handleSetDefault} onToggleBroker={handleToggleBroker} />
          </FolderTabsTrigger>
        ))}
      </FolderTabsList>
      <FolderTabsBody>
        {brokers.map((broker) => (
          <FolderTabsContent key={broker.id} value={broker.id}>
            <div className='flex items-center justify-between'>
              <h3 className='text-muted-foreground text-lg font-medium'>
                {SETTINGS_CONSTANTS.CONFIGURE_CHARGES_LABEL.replace('{{brokerName}}', broker.name)}
              </h3>
              {broker.isDefault && (
                <Badge variant='secondary' shape='pill' className='h-full'>
                  <StarIcon className='size-3 fill-current stroke-current' />
                  {COMMON_STRINGS.DEFAULT}
                </Badge>
              )}
              {!broker.enabled && (
                <Badge variant='destructive' shape='pill'>
                  <BanIcon className='size-3 stroke-current' />
                  {COMMON_STRINGS.DEACTIVATED}
                </Badge>
              )}
            </div>
            <span className='font-medium'>{SETTINGS_CONSTANTS.REGULATORY_CHARGES_LABEL}</span>
            <BrokerChargesTable charges={broker.charges} key={broker.id} />
            <span className='font-medium'>{SETTINGS_CONSTANTS.OTHER_CHARGES_LABEL}</span>
            <div className='text-muted-foreground grid grid-cols-[auto_1fr] gap-4 rounded-md border p-2 text-sm'>
              <span>{SETTINGS_CONSTANTS.GST_LABEL}</span>
              <span className='text-foreground'>{broker.gstOnCharges}%</span>
            </div>
          </FolderTabsContent>
        ))}
      </FolderTabsBody>
    </FolderTabs>
  );
}
