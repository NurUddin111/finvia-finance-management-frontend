"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ActionResult } from "@/types/actions";

export interface PaymentMethodStats {
  online: number;
  cash: number;
  total: number;
}

export const getPaymentMethodStats = async (): Promise<
  ActionResult<PaymentMethodStats>
> => {
  return serverFetch<PaymentMethodStats>("/payment/method-stats", {
    cache: "no-store",
  });
};
