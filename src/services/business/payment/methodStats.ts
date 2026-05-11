"use server";

import { cookies } from "next/headers";

type PaymentMethodStats = { online: number; cash: number; total: number };

export const getPaymentMethodStats = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      "http://localhost:1126/api/v1/payment/method-stats",
      {
        method: "GET",
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: result?.message || "Failed to fetch payment method stats",
      };
    }

    return { success: true, data: result.data as PaymentMethodStats };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Something went wrong" };
  }
};
