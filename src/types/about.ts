export interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}

export interface WhyChooseUsItem {
  id: string;
  iconName: 'ShieldCheck' | 'FileText' | 'Star' | 'CalendarCheck' | 'Clock' | 'Users';
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: string;
  action: string;
  title: string;
  description: string;
  badge: string;
}

export interface TeacherBenefit {
  id: string;
  title: string;
  description: string;
  iconName: 'UserCheck' | 'BookOpen' | 'Coins' | 'Calendar' | 'BellRing' | 'Users';
}

export interface StudentBenefit {
  id: string;
  title: string;
  description: string;
}

export interface VisionMissionItem {
  type: 'vision' | 'mission';
  title: string;
  quote?: string;
  description: string;
  iconName: 'Compass' | 'Target';
}
