"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ActionResult } from "@/types/actions";
import {
  IClientsPieChartData,
  ITopClient,
  MonthlyClientCount,
} from "@/types/client";
import { IKPICardDetails } from "@/types/dashboard";
import { IOverdueInvoice, IUpcomingOverdueInvoice } from "@/types/invoice";
import { IRecentTransaction } from "@/types/payment";

export const getClientsNumByMonth = async (): Promise<
  ActionResult<MonthlyClientCount>
> => {
  return serverFetch<MonthlyClientCount>("/business/clients-by-month", {
    cache: "no-store",
  });
};

export const getClientsPieChartData = async (): Promise<
  ActionResult<IClientsPieChartData>
> => {
  return serverFetch<IClientsPieChartData>("/business/clients-pie-chart", {
    cache: "no-store",
  });
};

export const getTopClients = async (): Promise<ActionResult<ITopClient[]>> => {
  return serverFetch<ITopClient[]>("/business/top-clients", {
    cache: "no-store",
  });
};

export const getKPICardDetails = async (): Promise<
  ActionResult<IKPICardDetails>
> => {
  return serverFetch<IKPICardDetails>("/business/kpi-card-details", {
    cache: "no-store",
  });
};

export const getMonthlyRevenue = async (): Promise<
  ActionResult<Record<string, number>>
> => {
  return serverFetch<Record<string, number>>("/business/monthly-revenue", {
    cache: "no-store",
  });
};

export const getOverdueInvoices = async (): Promise<
  ActionResult<IOverdueInvoice[]>
> => {
  return serverFetch<IOverdueInvoice[]>("/business/overdue-invoices", {
    cache: "no-store",
  });
};

export const getUpcomingOverdueInvoices = async (): Promise<
  ActionResult<IUpcomingOverdueInvoice[]>
> => {
  return serverFetch<IUpcomingOverdueInvoice[]>(
    "/business/upcoming-overdue-invoices",
    { cache: "no-store" },
  );
};

export const getRecentTransactions = async (): Promise<
  ActionResult<IRecentTransaction[]>
> => {
  return serverFetch<IRecentTransaction[]>("/business/recent-transactions", {
    cache: "no-store",
  });
};
