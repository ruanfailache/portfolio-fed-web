import '@testing-library/jest-dom'
import { mockMatchMedia, mockDocumentElement } from './test/mocks/windowMocks'

Object.defineProperty(window, 'matchMedia', mockMatchMedia)
Object.defineProperty(document, 'documentElement', {
  value: mockDocumentElement,
  writable: true,
  configurable: true
})
