import { Curriculum } from '@core/models/Profile';

export function useCurriculumDownload(curriculum: Curriculum) {
  const downloadUrl = `/api/download-pdf?url=${encodeURIComponent(curriculum.url)}&filename=${encodeURIComponent(curriculum.filename)}`;
  
  return {
    downloadUrl,
    filename: curriculum.filename
  };
}
