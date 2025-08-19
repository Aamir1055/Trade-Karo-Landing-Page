export interface FormData {
  fullname: string;
  Mobile: string;
  Language: string;
  Experience: string;
  demoAccount: string;
  market: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TestimonialProps {
  content: string;
  author: string;
}

export interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
}
