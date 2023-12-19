import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'textarea[autoExpand]'
})
export class AutoExpandDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event.target'])
  onInput(textarea: HTMLTextAreaElement): void {
    this.adjustTextareaHeight(textarea);
  }

  ngOnInit() {
    // Initial height adjustment
    this.adjustTextareaHeight(this.el.nativeElement);
  }

  private adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
