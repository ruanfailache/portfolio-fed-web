import React from 'react';

export const mockSideBar = function MockSideBar() {
  return <aside data-testid="sidebar">SideBar</aside>;
};

export const mockThemeProvider = function MockThemeProvider({ children }: { children: React.ReactNode }) {
  return <div data-testid="theme-provider">{children}</div>;
};

export const mockHomeBannerImage = function MockHomeBannerImage({ profileImageSrc }: { profileImageSrc: string }) {
  return (
    <div data-testid="home-banner-image">
      <img src={profileImageSrc} alt="Profile" />
    </div>
  );
};

export const mockHomeBannerContent = function MockHomeBannerContent({ 
  curriculum, 
  title, 
  description, 
  body, 
  experience 
}: {
  curriculum: any;
  title: string;
  description: string;
  body: string;
  experience: string;
}) {
  return (
    <div data-testid="home-banner-content">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{body}</p>
      <p>{experience}</p>
      <span data-testid="curriculum-filename">{curriculum.filename}</span>
    </div>
  );
};

export const mockProfessionalExperienceSection = function MockProfessionalExperienceSection() {
  return <div data-testid="professional-experience-section">Professional Experience</div>;
};
