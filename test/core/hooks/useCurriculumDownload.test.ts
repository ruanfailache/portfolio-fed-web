import { renderHook } from '@testing-library/react';
import { useCurriculumDownload } from '@core/hooks/useCurriculumDownload';
import { Curriculum } from '@core/models/Profile';

describe('useCurriculumDownload', () => {
  describe('Given a curriculum with valid data', () => {
    const mockCurriculum: Curriculum = {
      url: 'https://example.com/curriculum.pdf',
      filename: 'curriculum-ruan.pdf'
    };

    describe('When the hook is called', () => {
      it('Then should return the correct download URL', () => {
        const { result } = renderHook(() => useCurriculumDownload(mockCurriculum));
        
        const expectedUrl = `/api/download-pdf?url=${encodeURIComponent(mockCurriculum.url)}&filename=${encodeURIComponent(mockCurriculum.filename)}`;
        
        expect(result.current.downloadUrl).toBe(expectedUrl);
      });

      it('Then should return the correct filename', () => {
        const { result } = renderHook(() => useCurriculumDownload(mockCurriculum));
        
        expect(result.current.filename).toBe(mockCurriculum.filename);
      });
    });
  });

  describe('Given a curriculum with special characters in URL', () => {
    const mockCurriculum: Curriculum = {
      url: 'https://example.com/curriculum with spaces.pdf',
      filename: 'curriculum-ruan-2024.pdf'
    };

    describe('When the hook is called', () => {
      it('Then should properly encode the URL parameters', () => {
        const { result } = renderHook(() => useCurriculumDownload(mockCurriculum));
        
        expect(result.current.downloadUrl).toContain('curriculum%20with%20spaces.pdf');
        expect(result.current.downloadUrl).toContain('curriculum-ruan-2024.pdf');
      });
    });
  });

  describe('Given a curriculum with empty filename', () => {
    const mockCurriculum: Curriculum = {
      url: 'https://example.com/curriculum.pdf',
      filename: ''
    };

    describe('When the hook is called', () => {
      it('Then should handle empty filename correctly', () => {
        const { result } = renderHook(() => useCurriculumDownload(mockCurriculum));
        
        expect(result.current.filename).toBe('');
        expect(result.current.downloadUrl).toContain('filename=');
      });
    });
  });
});
