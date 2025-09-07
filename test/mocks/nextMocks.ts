export const mockNextRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

export const mockNextNavigation = () => ({
  useRouter: () => mockNextRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
});
