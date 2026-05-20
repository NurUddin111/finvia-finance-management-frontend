"use server";

import { serverFetch } from "@/lib/serverFetch";
import { ActionResult } from "@/types/actions";
import {
  IClientsPieChartData,
  ITopClient,
  MonthlyClientCount,
} from "@/types/client";
import { IKPICardDetails } from "@/types/dashboard";

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
