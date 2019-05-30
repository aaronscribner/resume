import { animate, style, transition, trigger, state, group } from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('true', style({
      'max-height': '100%', 'opacity': '1', 'visibility': 'visible'
    })),
    state('false', style({
      'max-height': '0%', 'opacity': '0', 'visibility': 'hidden'
    })),
    transition('true => false', [group([
      animate('400ms ease-in-out', style({
        opacity: '0'
      })),
      animate('400ms ease-in-out', style({
        'max-height': '0%'
      })),
      animate('400ms ease-in-out', style({
        visibility: 'hidden'
      }))
    ]
    )]),
    transition('false => true', [group([
      animate('400ms ease-in-out', style({
        visibility: 'visible'
      })),
      animate('400ms ease-in-out', style({
        'max-height': '100%'
      })),
      animate('400ms ease-in-out', style({
        opacity: '1'
      }))
    ]
    )])
  ])
];
