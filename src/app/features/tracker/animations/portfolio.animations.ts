import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeAnimation = trigger('fadeInOut', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out')]),
  transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))]),
]);
