
import type React from 'react';

export interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  color: string;
}
