import { extractNameFromUrl, getIconFromUrl } from '@core/utils/url';

describe('URL Utils', () => {
  describe('extractNameFromUrl', () => {
    describe('Given different social network URLs', () => {
      it.each([
        {
          description: 'GitHub URL',
          url: 'https://github.com/username',
          expected: 'GitHub'
        },
        {
          description: 'LinkedIn URL',
          url: 'https://linkedin.com/in/username',
          expected: 'LinkedIn'
        },
        {
          description: 'Twitter URL',
          url: 'https://twitter.com/username',
          expected: 'Twitter'
        },
        {
          description: 'Instagram URL',
          url: 'https://instagram.com/username',
          expected: 'Instagram'
        },
        {
          description: 'GitHub URL with different path',
          url: 'https://github.com/org/repo',
          expected: 'GitHub'
        },
        {
          description: 'LinkedIn URL with different path',
          url: 'https://linkedin.com/company/company-name',
          expected: 'LinkedIn'
        },
        {
          description: 'Twitter URL with different path',
          url: 'https://twitter.com/user/status/123',
          expected: 'Twitter'
        },
        {
          description: 'Instagram URL with different path',
          url: 'https://instagram.com/user/p/ABC123',
          expected: 'Instagram'
        }
      ])('Then should return $expected for $description', ({ url, expected }) => {
        const result = extractNameFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });

    describe('Given URLs with subdomains', () => {
      it.each([
        {
          description: 'GitHub with www subdomain',
          url: 'https://www.github.com/username',
          expected: 'www.github.com'
        },
        {
          description: 'LinkedIn with www subdomain',
          url: 'https://www.linkedin.com/in/username',
          expected: 'www.linkedin.com'
        },
        {
          description: 'Twitter with www subdomain',
          url: 'https://www.twitter.com/username',
          expected: 'www.twitter.com'
        },
        {
          description: 'Instagram with www subdomain',
          url: 'https://www.instagram.com/username',
          expected: 'www.instagram.com'
        },
        {
          description: 'GitHub with api subdomain',
          url: 'https://api.github.com/user',
          expected: 'api.github.com'
        },
        {
          description: 'LinkedIn with m subdomain',
          url: 'https://m.linkedin.com/in/username',
          expected: 'm.linkedin.com'
        }
      ])('Then should return hostname for $description', ({ url, expected }) => {
        const result = extractNameFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });

    describe('Given unknown and invalid URLs', () => {
      it.each([
        {
          description: 'unknown domain',
          url: 'https://example.com/profile',
          expected: 'example.com'
        },
        {
          description: 'another unknown domain',
          url: 'https://mywebsite.org/about',
          expected: 'mywebsite.org'
        },
        {
          description: 'custom domain',
          url: 'https://portfolio.dev/contact',
          expected: 'portfolio.dev'
        },
        {
          description: 'invalid URL string',
          url: 'not-a-valid-url',
          expected: 'External Link'
        },
        {
          description: 'empty string',
          url: '',
          expected: 'External Link'
        },
        {
          description: 'malformed URL',
          url: 'htp://invalid-protocol.com',
          expected: 'invalid-protocol.com'
        },
        {
          description: 'URL without protocol',
          url: 'github.com/username',
          expected: 'External Link'
        },
        {
          description: 'URL with special characters',
          url: 'https://example.com/path with spaces',
          expected: 'example.com'
        }
      ])('Then should handle $description correctly', ({ url, expected }) => {
        const result = extractNameFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });
  });

  describe('getIconFromUrl', () => {
    describe('Given different social network URLs', () => {
      it.each([
        {
          description: 'GitHub URL',
          url: 'https://github.com/username',
          expected: 'github'
        },
        {
          description: 'LinkedIn URL',
          url: 'https://linkedin.com/in/username',
          expected: 'linkedin'
        },
        {
          description: 'Twitter URL',
          url: 'https://twitter.com/username',
          expected: 'twitter'
        },
        {
          description: 'Instagram URL',
          url: 'https://instagram.com/username',
          expected: 'instagram'
        },
        {
          description: 'GitHub URL with different path',
          url: 'https://github.com/org/repo',
          expected: 'github'
        },
        {
          description: 'LinkedIn URL with different path',
          url: 'https://linkedin.com/company/company-name',
          expected: 'linkedin'
        },
        {
          description: 'Twitter URL with different path',
          url: 'https://twitter.com/user/status/123',
          expected: 'twitter'
        },
        {
          description: 'Instagram URL with different path',
          url: 'https://instagram.com/user/p/ABC123',
          expected: 'instagram'
        }
      ])('Then should return $expected for $description', ({ url, expected }) => {
        const result = getIconFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });

    describe('Given URLs with subdomains', () => {
      it.each([
        {
          description: 'GitHub with www subdomain',
          url: 'https://www.github.com/username',
          expected: 'external-link'
        },
        {
          description: 'LinkedIn with www subdomain',
          url: 'https://www.linkedin.com/in/username',
          expected: 'external-link'
        },
        {
          description: 'Twitter with www subdomain',
          url: 'https://www.twitter.com/username',
          expected: 'external-link'
        },
        {
          description: 'Instagram with www subdomain',
          url: 'https://www.instagram.com/username',
          expected: 'external-link'
        },
        {
          description: 'GitHub with api subdomain',
          url: 'https://api.github.com/user',
          expected: 'external-link'
        },
        {
          description: 'LinkedIn with m subdomain',
          url: 'https://m.linkedin.com/in/username',
          expected: 'external-link'
        }
      ])('Then should return external-link for $description', ({ url, expected }) => {
        const result = getIconFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });

    describe('Given unknown and invalid URLs', () => {
      it.each([
        {
          description: 'unknown domain',
          url: 'https://example.com/profile',
          expected: 'external-link'
        },
        {
          description: 'another unknown domain',
          url: 'https://mywebsite.org/about',
          expected: 'external-link'
        },
        {
          description: 'custom domain',
          url: 'https://portfolio.dev/contact',
          expected: 'external-link'
        },
        {
          description: 'invalid URL string',
          url: 'not-a-valid-url',
          expected: 'external-link'
        },
        {
          description: 'empty string',
          url: '',
          expected: 'external-link'
        },
        {
          description: 'malformed URL',
          url: 'htp://invalid-protocol.com',
          expected: 'external-link'
        },
        {
          description: 'URL without protocol',
          url: 'github.com/username',
          expected: 'external-link'
        },
        {
          description: 'URL with special characters',
          url: 'https://example.com/path with spaces',
          expected: 'external-link'
        }
      ])('Then should return external-link for $description', ({ url, expected }) => {
        const result = getIconFromUrl(url);
        
        expect(result).toBe(expected);
      });
    });
  });
});
