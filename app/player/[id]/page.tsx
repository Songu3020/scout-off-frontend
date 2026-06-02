import type { Metadata } from 'next';
import PlayerProfileClient from './PlayerProfileClient';
import { getPlayer } from '@/lib/contract';
import { ipfsUrl } from '@/lib/ipfs';
import type { Player } from '@/types';

const ROOT_URL = 'https://scoutoff.app';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const url = `${ROOT_URL}/player/${params.id}`;

  // Attempt to fetch player data for dynamic OG tags
  let playerName = '';
  let playerImage = '';
  try {
    const player = (await getPlayer(params.id)) as Player | null;
    if (player) {
      playerName = player.vitals.name;
      playerImage = player.ipfsHash ? await ipfsUrl(player.ipfsHash) : '';
    }
  } catch {
    // Silently fall back to default OG tags
  }

  const title = playerName
    ? `${playerName} — ScoutOff Player Profile`
    : 'ScoutOff — Decentralized Football Scouting';
  const description = playerName
    ? `View ${playerName}'s on-chain verified profile, milestones, and scouting data on ScoutOff.`
    : 'Tamper-proof player profiles, verifiable milestones, and direct scout-to-player connections — powered by Stellar Soroban smart contracts.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ScoutOff',
      type: 'profile',
      images: playerImage
        ? [
            {
              url: playerImage,
              width: 1200,
              height: 630,
              alt: `${playerName} — ScoutOff Player Profile`,
            },
          ]
        : [
            {
              url: `${ROOT_URL}/og-image.svg`,
              width: 1200,
              height: 630,
              alt: 'ScoutOff — Decentralized Football Scouting on Stellar',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: playerImage ? [playerImage] : [`${ROOT_URL}/og-image.svg`],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function PlayerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  return <PlayerProfileClient id={params.id} />;
}
