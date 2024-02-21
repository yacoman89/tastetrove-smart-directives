# TasteTrove - Smart Directives Demo

This is an Angular 17 project that outlines how to use smart directives.

This particular version of the repo uses simple smart directives for the dashboard and smart components elsewhere.

## Stack

- Angular 17
  - New control flow
  - Standalone components
  - OnPush everywhere
- Tailwind 3
  - Default config
- NGXS 3
  - State management
  - Interactions with the store must go through state facades
- JSON Server
  - Mock backend and DB

## Running app

Start JSON Server `npm run jsrv`

Start application `npm run start`

## Simple smart directive

Let's say you have a simple component like this.
```Typescript
@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent {
  @Input() heros?: Hero[];
  @Input() loading?: boolean;
  @Input() error?: Error;
}
```

We create a directive that sets up store selectors and assigns them to outputs in the constructor.
```Typescript
@Directive({ selector: '[herosList]' })
export class HerosListDirective {
  @Output() heros: Observable<Hero[]>;
  @Output() herosLoading: Observable<boolean>;
  @Output() herosLoadError: Observable<Error | null>;

  constructor(herosStateFacade: HerosStateFacade) {
    this.heros = herosStateFacade.heros$;
    this.herosLoading = herosStateFacade.herosLoading$;
    this.herosLoadError = herosStateFacade.herosLoadError$;
  }
}
```

You can then use the directive in your template to provide your components the data they need.
```html
<hero-list
  #heroList
  herosList
  (heros)="heroList.heros = $event"
  (herosLoading)="heroList.loading = $event"
  (herosLoadError)="heroList.error = $event"
></hero-list>
```
