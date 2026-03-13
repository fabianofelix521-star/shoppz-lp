export interface SiteContent {
  navbar: {
    logoText: string;
    logoAccent: string;
    links: { label: string; href: string }[];
    ctaText: string;
    ctaWhatsapp: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    whatsappUrl: string;
    stats: { value: string; label: string }[];
    phones: {
      storeName: string;
      category: string;
      imageUrl: string;
      price: string;
    }[];
    statsBar: { label: string }[];
  };
  features: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  portfolio: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    stores: {
      name: string;
      badge: string;
      image: string;
      link: string;
      sales: string;
      visits: string;
    }[];
  };
  testimonials: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: {
      text: string;
      name: string;
      role: string;
      avatar: string;
      stars: number;
    }[];
  };
  integrations: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: { icon: string; name: string; description: string }[];
    compliance: { icon: string; label: string }[];
  };
  ctaFinal: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    buttonText: string;
    whatsappUrl: string;
  };
  footer: {
    brandDescription: string;
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    social: {
      instagram: string;
      facebook: string;
      linkedin: string;
    };
    copyright: string;
    quickLinks: { label: string; href: string }[];
  };
}

export interface AdminUser {
  username: string;
  password: string;
}
