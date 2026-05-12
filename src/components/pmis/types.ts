import React, { ReactNode } from 'react';
import { UserConfig } from '../../data';

export interface PmisLuoiAppProps {
  config: UserConfig;
  onBack: () => void;
}

export interface Incident {
  id: number;
  time: string;
  device: string;
  description: string;
  cause: string;
  status: string;
  voltage: string;
  type: string;
  images: string[];
  attachments: { name: string; size: string }[];
  reduction: { status: string; content: string };
  tracking: { date: string; content: string }[];
}

export interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: string;
}

export interface DeviceDetail {
  info: { label: string; value: string; icon?: ReactNode; valueColor?: string; badge?: string }[];
  images: string[];
  tracking: { id: string; title: string; icon: ReactNode; color: string; items: { date: string; content: string; status: string }[] }[];
}

export interface SearchTag {
  text: string;
  type?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: ReactNode;
  subItems: string[];
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface IncidentChartData {
  name: string;
  thietBi: number;
  duongDay: number;
  tram: number;
}

export interface WorkloadChartData {
  name: string;
  anToan: number;
  vanHanh: number;
  suaChua: number;
  thiNghiem: number;
}
