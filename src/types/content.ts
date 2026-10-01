export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  category: 'trust' | 'booking' | 'experience' | 'security';
  icon: string;
  highlightText?: string;
}

export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  description: string;
  details: string[];
  duration: string;
  badge: string;
}

export interface CriteriaItem {
  id: string;
  name: string;
  icon: string;
  summary: string;
  filterExample: string;
}

export interface TeacherPerk {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PlatformContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    supportEmail: string;
    supportPhone: string;
    location: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    imagePath: string;
    activeTutorsPreviewCount: number;
  };
  about: {
    title: string;
    subtitle: string;
    summaryParagraph: string;
    secondaryParagraph: string;
    pillars: {
      students: {
        title: string;
        description: string;
        points: string[];
      };
      parents: {
        title: string;
        description: string;
        points: string[];
      };
      tutors: {
        title: string;
        description: string;
        points: string[];
      };
    };
    journeyStages: Array<{
      order: string;
      title: string;
      desc: string;
    }>;
  };
  visionMission: {
    vision: {
      title: string;
      quote: string;
      description: string;
    };
    mission: {
      title: string;
      lead: string;
      criteria: CriteriaItem[];
    };
  };
  whyUs: {
    title: string;
    subtitle: string;
    cards: BenefitCard[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  audience: {
    title: string;
    subtitle: string;
    studentBenefits: string[];
    parentBenefits: string[];
    imagePath: string;
  };
  tutors: {
    badge: string;
    title: string;
    description: string;
    ctaText: string;
    imagePath: string;
    perks: TeacherPerk[];
    calculatorDefaults: {
      defaultHoursPerWeek: number;
      defaultHourlyRate: number;
      currency: string;
    };
  };
  stats: {
    title: string;
    subtitle: string;
    items: StatItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
    guarantees: string[];
  };
}
