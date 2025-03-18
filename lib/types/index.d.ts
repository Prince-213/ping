interface CardImages {
  logo: string;
  profile: string;
  cover: string;
}

interface CardPersonal {
  name: string;
  jobTitle: string;
  department: string;
  companyName: string;
  accreditations: string;
  headline: string;
  bio: string;
}

interface CardGeneral {
  email: string;
  phone: string;
  companyUrl: string;
  link: string;
  address: string;
}

interface CardSocial {
  x: string;
  instagram: string;
  thread: string;
  linkedin: string;
  facebook: string;
  youtube: string;
  snapchat: string;
  tiktok: string;
  twitch: string;
}

interface CardChat {
  whatsapp: string;
}

interface CardDetails {
  theme: Theming;
  images: CardImages;
  personal: CardPersonal;
  general: CardGeneral;
  social: CardSocial;
  chat: CardChat;
}

interface Theming {
  color: number;
  layout: number;
  action: boolean;
}

interface TempImages {
  logo: string;
  profile: string;
  cover: string;
}

interface Theme {
  id: number;
  background: string;
  button: string;

  primaryText: string;
  writing: string;
  buttonText: string;

  secondaryText: string;
}
