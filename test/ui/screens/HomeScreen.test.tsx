import { render, screen } from '@testing-library/react';
import HomeScreen from '@ui/screens/HomeScreen';

jest.mock('@ui/organisms/HomeBannerSection', () => ({
  HomeBannerSection: function MockHomeBannerSection() {
    return <section data-testid="home-banner-section">Home Banner Section</section>;
  }
}));

jest.mock('@ui/organisms/ProfessionalExperienceSection', () => ({
  ProfessionalExperienceSection: function MockProfessionalExperienceSection() {
    return <div data-testid="professional-experience-section">Professional Experience</div>;
  }
}));

describe('HomeScreen', () => {
  describe('Given the HomeScreen component', () => {
    describe('When rendering', () => {
      it('Then should render main container with correct classes', () => {
        render(<HomeScreen />);
        
        const container = screen.getByText('Home Banner Section').closest('div');
        expect(container).toHaveClass('container', 'm-auto', 'p-4', 'lg:py-8', 'space-y-8', 'lg:space-y-16');
      });

      it('Then should render HomeBannerSection', () => {
        render(<HomeScreen />);
        
        const bannerSection = screen.getByTestId('home-banner-section');
        expect(bannerSection).toBeInTheDocument();
        expect(bannerSection).toHaveTextContent('Home Banner Section');
      });

      it('Then should render ProfessionalExperienceSection', () => {
        render(<HomeScreen />);
        
        const experienceSection = screen.getByTestId('professional-experience-section');
        expect(experienceSection).toBeInTheDocument();
        expect(experienceSection).toHaveTextContent('Professional Experience');
      });

      it('Then should render both sections in correct order', () => {
        render(<HomeScreen />);
        
        const bannerSection = screen.getByTestId('home-banner-section');
        const experienceSection = screen.getByTestId('professional-experience-section');
        
        expect(bannerSection).toBeInTheDocument();
        expect(experienceSection).toBeInTheDocument();
        
        // Check if banner comes before experience in DOM order
        const container = bannerSection.closest('div');
        const sections = container?.children;
        expect(sections?.[0]).toBe(bannerSection);
        expect(sections?.[1]).toBe(experienceSection);
      });

      it('Then should have proper spacing between sections', () => {
        render(<HomeScreen />);
        
        const container = screen.getByText('Home Banner Section').closest('div');
        expect(container).toHaveClass('space-y-8', 'lg:space-y-16');
      });
    });
  });
});