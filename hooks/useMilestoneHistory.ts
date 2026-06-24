"use client";
import { useState, useEffect } from "react";
import { getMilestoneHistory } from "@/lib/contract";

interface Milestone {
  id: string;
  description: string;
  evidenceHash: string;
  validator: string;
  timestamp: number;
}

interface UseMilestoneHistoryResult {
  milestones: Milestone[];
  isLoading: boolean;
  error: string | null;
}

export function useMilestoneHistory(playerId: string | null): UseMilestoneHistoryResult {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerId) return;
    setIsLoading(true);
    setError(null);
    getMilestoneHistory(playerId)
      .then((data) => setMilestones(data as Milestone[]))
      .catch((e: Error) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [playerId]);

  return { milestones, isLoading, error };
}
