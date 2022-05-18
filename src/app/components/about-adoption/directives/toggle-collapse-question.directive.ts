import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToggleCollapseQuestion]',
})
export class ToggleCollapseQuestionDirective implements OnInit {
  showAnswer: boolean = false;
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {}

  @HostListener('click') onToggleShowAnswer() {
    const answerContainer = this.element.nativeElement.nextElementSibling;
    const arrowImage = this.element.nativeElement.firstElementChild;
    this.showAnswer = !this.showAnswer;
    if (this.showAnswer) {
      this.renderer.addClass(answerContainer, 'show');
      arrowImage.style.transform = 'rotate(90deg)';
    } else {
      this.renderer.removeClass(answerContainer, 'show');
      arrowImage.style.transform = 'rotate(0deg)';
    }
  }
}
