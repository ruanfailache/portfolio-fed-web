import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideBar from '@ui/organisms/SideBar';

describe('SideBar', () => {
  describe('Given the SideBar component', () => {
    describe('When rendering the component', () => {
      it('Then should render the sidebar container', () => {
        render(<SideBar />);
        
        const sidebar = screen.getByRole('complementary');
        expect(sidebar).toBeInTheDocument();
      });

      it('Then should apply correct CSS classes to sidebar', () => {
        render(<SideBar />);
        
        const sidebar = screen.getByRole('complementary');
        expect(sidebar).toHaveClass('flex', 'lg:flex-col', 'justify-between', 'p-2', 'bg-theme-surface', 'lg:h-screen');
      });

      it('Then should render navigation sections', () => {
        render(<SideBar />);
        
        expect(screen.getByRole('link', { name: 'About me' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
      });

      it('Then should render social network links', () => {
        render(<SideBar />);
        
        expect(screen.getByRole('link', { name: 'Github' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Linkedin' })).toBeInTheDocument();
      });
    });

    describe('When checking navigation links', () => {
      it('Then should render About me link with correct href', () => {
        render(<SideBar />);
        
        const aboutLink = screen.getByRole('link', { name: 'About me' });
        expect(aboutLink).toHaveAttribute('href', '/');
      });

      it('Then should render Projects link with correct href', () => {
        render(<SideBar />);
        
        const projectsLink = screen.getByRole('link', { name: 'Projects' });
        expect(projectsLink).toHaveAttribute('href', '/projects');
      });

      it('Then should render Github link with correct href', () => {
        render(<SideBar />);
        
        const githubLink = screen.getByRole('link', { name: 'Github' });
        expect(githubLink).toHaveAttribute('href', 'https://github.com/RuanFailache');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      });

      it('Then should render Linkedin link with correct href', () => {
        render(<SideBar />);
        
        const linkedinLink = screen.getByRole('link', { name: 'Linkedin' });
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ruanfailache/');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    describe('When checking navigation structure', () => {
      it('Then should render two navigation elements', () => {
        render(<SideBar />);
        
        const navElements = screen.getAllByRole('navigation');
        expect(navElements).toHaveLength(2);
      });

      it('Then should render sections navigation with correct structure', () => {
        render(<SideBar />);
        
        const navElements = screen.getAllByRole('navigation');
        const sectionsNav = navElements[0];
        const sectionsList = sectionsNav.querySelector('ul');
        
        expect(sectionsList).toHaveClass('flex', 'lg:flex-col', 'gap-2');
      });

      it('Then should render social networks navigation with correct structure', () => {
        render(<SideBar />);
        
        const navElements = screen.getAllByRole('navigation');
        const socialNav = navElements[1];
        const socialList = socialNav.querySelector('ul');
        
        expect(socialList).toHaveClass('flex', 'lg:flex-col', 'gap-2');
      });
    });

    describe('When user interacts with navigation', () => {
      it('Then should navigate to About me page when clicked', async () => {
        const user = userEvent.setup();
        render(<SideBar />);
        
        const aboutLink = screen.getByRole('link', { name: 'About me' });
        await user.click(aboutLink);
        
        expect(aboutLink).toHaveAttribute('href', '/');
      });

      it('Then should navigate to Projects page when clicked', async () => {
        const user = userEvent.setup();
        render(<SideBar />);
        
        const projectsLink = screen.getByRole('link', { name: 'Projects' });
        await user.click(projectsLink);
        
        expect(projectsLink).toHaveAttribute('href', '/projects');
      });

      it('Then should open Github in new tab when clicked', async () => {
        const user = userEvent.setup();
        render(<SideBar />);
        
        const githubLink = screen.getByRole('link', { name: 'Github' });
        await user.click(githubLink);
        
        expect(githubLink).toHaveAttribute('href', 'https://github.com/RuanFailache');
        expect(githubLink).toHaveAttribute('target', '_blank');
      });

      it('Then should open Linkedin in new tab when clicked', async () => {
        const user = userEvent.setup();
        render(<SideBar />);
        
        const linkedinLink = screen.getByRole('link', { name: 'Linkedin' });
        await user.click(linkedinLink);
        
        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ruanfailache/');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
      });
    });

    describe('When checking icon rendering', () => {
      it('Then should render icons for all navigation items', () => {
        render(<SideBar />);
        
        const links = screen.getAllByRole('link');
        links.forEach(link => {
          const icon = link.querySelector('svg');
          expect(icon).toBeInTheDocument();
        });
      });

      it('Then should render icons with correct sizes', () => {
        render(<SideBar />);
        
        const socialLinks = screen.getAllByRole('link').slice(2);
        socialLinks.forEach(link => {
          const icon = link.querySelector('svg');
          expect(icon).toHaveAttribute('width', '16');
        });
      });
    });
  });
});
