import { ElementRef, Renderer2 } from '@angular/core';
import { ToggleCollapseQuestionDirective } from './toggle-collapse-question.directive';

describe('ToggleCollapseQuestionDirective', () => {
  let element: ElementRef;
  let renderer: Renderer2;
  it('should create an instance', () => {
    const directive = new ToggleCollapseQuestionDirective(element, renderer);
    expect(directive).toBeTruthy();
  });
});
