'use client';
import { useState, useCallback } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/components/ui/Toast';
import {
  buildPayToContact,
  getSubscription,
  PLATFORM_CONTACT_FEE_XLM,
} from '@/lib/contract';

export function usePayToContact() {
  const { publicKey, signAndSubmit } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlock = useCallback(
    async (playerId: string): Promise<void> => {
      function fail(msg: string): void {
        setError(msg);
        show({ message: msg, variant: 'error' });
      }

      if (!publicKey) {
        fail('Wallet not connected.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // ── 1. Subscription gate ──────────────────────────────────────────────
        const subscription = await getSubscription(publicKey);
        const now = Date.now() / 1000;
        if (!subscription || subscription.expiresAt < now) {
          fail(
            'An active subscription is required to contact players. Please subscribe or renew.',
          );
          return;
        }

        // ── 2. Balance gate ───────────────────────────────────────────────────
        const balance = parseFloat(xlmBalance ?? '0');
        if (balance < PLATFORM_CONTACT_FEE_XLM) {
          fail(
            `Insufficient XLM. You need at least ${PLATFORM_CONTACT_FEE_XLM} XLM to contact this player.`,
          );
          return;
        }

        // Call the contract function
        const contactDetails = await payToContact(publicKey, playerId, signAndSubmit);
        return contactDetails;
      } catch (e: any) {
        const msg = e?.message ?? 'An error occurred while contacting the player.';
        setError(msg);
        show({ message: msg, variant: 'error' });
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [publicKey, signAndSubmit],
  );

  return { unlock, loading, error };
}
