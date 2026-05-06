import { db } from "@/lib/db";
import type { InstaQLOptions, TransactionChunk } from "@instantdb/core";
import type { Invited } from "@/lib/types";

export function useDatabase() {
  const useQuery = (query: any, opts?: InstaQLOptions) => {
    type QueryResult = {
      data: { invited: Invited[] } | undefined;
      isLoading: boolean;
      error: undefined;
    };

    const result = db.useQuery(query as never, opts);
    return result as QueryResult;
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
