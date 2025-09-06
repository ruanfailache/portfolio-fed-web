export const extractNameFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    const socialNetworks = {
      'github.com': 'GitHub',
      'linkedin.com': 'LinkedIn',
      'twitter.com': 'Twitter',
      'instagram.com': 'Instagram',
    };

    return socialNetworks[hostname as keyof typeof socialNetworks] || urlObj.hostname;
  } catch {
    return 'External Link';
  }
};

export const getIconFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    const socialNetworks = {
      'github.com': 'github',
      'linkedin.com': 'linkedin',
      'twitter.com': 'twitter',
      'instagram.com': 'instagram',
    };

    return socialNetworks[hostname as keyof typeof socialNetworks] || 'external-link';
  } catch {
    return 'external-link';
  }
};
