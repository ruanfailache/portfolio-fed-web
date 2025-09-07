export const mockMatchMedia = {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
};

export const mockDocumentElement = {
  classList: {
    add: jest.fn(),
    remove: jest.fn(),
  },
  className: '',
};

export const mockDocument = {
  documentElement: mockDocumentElement,
};
