import { renderHook } from '@testing-library/react';
import { useSkills } from '@core/hooks/useSkills';
import { FaAngular, FaJava, FaNodeJs, FaReact } from 'react-icons/fa';

describe('useSkills', () => {
  describe('Given the hook is called', () => {
    describe('When retrieving main skills', () => {
      it('Then should return the correct main skills array', () => {
        const { result } = renderHook(() => useSkills());
        
        expect(result.current.mainSkills).toHaveLength(4);
      });

      it('Then should include Java skill with correct icon', () => {
        const { result } = renderHook(() => useSkills());
        
        const javaSkill = result.current.mainSkills.find(skill => skill.name === 'Java');
        
        expect(javaSkill).toBeDefined();
        expect(javaSkill?.icon).toBe(FaJava);
      });

      it('Then should include Angular skill with correct icon', () => {
        const { result } = renderHook(() => useSkills());
        
        const angularSkill = result.current.mainSkills.find(skill => skill.name === 'Angular');
        
        expect(angularSkill).toBeDefined();
        expect(angularSkill?.icon).toBe(FaAngular);
      });

      it('Then should include React skill with correct icon', () => {
        const { result } = renderHook(() => useSkills());
        
        const reactSkill = result.current.mainSkills.find(skill => skill.name === 'React');
        
        expect(reactSkill).toBeDefined();
        expect(reactSkill?.icon).toBe(FaReact);
      });

      it('Then should include Node skill with correct icon', () => {
        const { result } = renderHook(() => useSkills());
        
        const nodeSkill = result.current.mainSkills.find(skill => skill.name === 'Node');
        
        expect(nodeSkill).toBeDefined();
        expect(nodeSkill?.icon).toBe(FaNodeJs);
      });
    });

    describe('When checking skills structure', () => {
      it('Then each skill should have name and icon properties', () => {
        const { result } = renderHook(() => useSkills());
        
        result.current.mainSkills.forEach(skill => {
          expect(skill).toHaveProperty('name');
          expect(skill).toHaveProperty('icon');
          expect(typeof skill.name).toBe('string');
          expect(typeof skill.icon).toBe('function');
        });
      });
    });
  });
});
