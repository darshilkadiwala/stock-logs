import { useMemo } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CHARGE_DEFINITIONS } from '@/constants/charges';
import { TRADE_TYPES } from '@/constants/trades';

import type { ChargeCategory, ChargeConfig } from '@/types/charge';

import { ChargeValue } from './charge-value';

interface BrokerChargesTableProps {
  charges: ChargeConfig[];
}

export function BrokerChargesTable({ charges }: BrokerChargesTableProps) {
  // 1. Group Data: Turn flat list into { STT: { intraday: ..., delivery: ... } }
  const groupedCharges = useMemo(() => {
    const map = new Map<ChargeCategory, { name: ChargeCategory; intraday?: ChargeConfig; delivery?: ChargeConfig }>();

    charges.forEach((charge) => {
      // Use the charge.name (key) to group
      if (!map.has(charge.name)) {
        // You might want a helper to get human readable name from key
        map.set(charge.name, { name: charge.name });
      }
      const entry = map.get(charge.name)!;

      if (charge.tradeType === TRADE_TYPES.INTRADAY) entry.intraday = charge;
      else if (charge.tradeType === TRADE_TYPES.DELIVERY) entry.delivery = charge;
    });

    return Array.from(map.values());
  }, [charges]);

  return (
    <div className='rounded-md border'>
      <Table className='**:'>
        <TableHeader>
          <TableRow>
            <TableHead className='border-e md:w-1/3'></TableHead>
            <TableHead className='p-3 ps-4 md:ps-6 lg:ps-12'>Intraday</TableHead>
            <TableHead>Delivery</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedCharges.map((group) => (
            <TableRow key={group.name} className='border-dashed'>
              <TableCell className='border-e p-3 font-medium whitespace-break-spaces'>
                {/* Map Key to Label here if needed */}
                {CHARGE_DEFINITIONS[group.name].label}
              </TableCell>
              <TableCell className='p-3 ps-4 md:ps-6 lg:ps-12'>
                {group.intraday ? (
                  <ChargeValue charge={group.intraday} />
                ) : (
                  <span className='text-muted-foreground'>-</span>
                )}
              </TableCell>
              <TableCell className='p-3'>
                {group.delivery ? (
                  <ChargeValue charge={group.delivery} />
                ) : (
                  <span className='text-muted-foreground'>-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
