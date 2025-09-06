import { render, screen } from '@testing-library/react';
import Tag from '@ui/atoms/Tag';

describe('Tag', () => {
  const mockText = 'React';

  describe('Given a tag with text', () => {
    describe('When rendering the component', () => {
      it('Then should display the provided text', () => {
        render(<Tag>{mockText}</Tag>);
        
        expect(screen.getByText(mockText)).toBeInTheDocument();
      });

      it('Then should render as a span element', () => {
        render(<Tag>{mockText}</Tag>);
        
        const tag = screen.getByText(mockText);
        expect(tag.tagName).toBe('SPAN');
      });

      it('Then should apply correct CSS classes', () => {
        render(<Tag>{mockText}</Tag>);
        
        const tag = screen.getByText(mockText);
        expect(tag).toHaveClass('text-xs', 'font-medium', 'text-white', 'leading-none');
      });
    });
  });

  describe('Given a tag with different text content', () => {
    describe('When rendering various tags', () => {
      it('Then should display JavaScript tag correctly', () => {
        render(<Tag>JavaScript</Tag>);
        
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
      });

      it('Then should display TypeScript tag correctly', () => {
        render(<Tag>TypeScript</Tag>);
        
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
      });

      it('Then should display Node.js tag correctly', () => {
        render(<Tag>Node.js</Tag>);
        
        expect(screen.getByText('Node.js')).toBeInTheDocument();
      });
    });
  });

  describe('Given a tag with special characters', () => {
    describe('When rendering tags with special content', () => {
      it('Then should handle tags with spaces correctly', () => {
        render(<Tag>React Native</Tag>);
        
        expect(screen.getByText('React Native')).toBeInTheDocument();
      });

      it('Then should handle tags with numbers correctly', () => {
        render(<Tag>HTML5</Tag>);
        
        expect(screen.getByText('HTML5')).toBeInTheDocument();
      });

      it('Then should handle tags with symbols correctly', () => {
        render(<Tag>C++</Tag>);
        
        expect(screen.getByText('C++')).toBeInTheDocument();
      });
    });
  });
});
