import { db } from "@/lib/db";
import type {
  InstantError,
  InstaQLOptions,
  TransactionChunk,
} from "@instantdb/core";
import type { Invited } from "@/lib/types";

export function useDatabase() {
  const useQuery = (query: any, opts?: InstaQLOptions) => {
    return db.useQuery(query as never, opts) as {
      data: { invited: Invited[] } | undefined;
      isLoading: boolean;
      error: InstantError | null;
    };
  };

  const useMutation = (
    chunks: TransactionChunk<any, any> | TransactionChunk<any, any>[],
  ) => {
    return db.transact(chunks);
  };

  const useAuth = () => {
    return db.auth;
  };

  return {
    useQuery,
    useMutation,
    useAuth,
  };
}
