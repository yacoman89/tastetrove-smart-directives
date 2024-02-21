# TasteTrove - Smart Directives Demo

This is an Angular 17 project that outlines how to use smart directives.

This particular version of the repo uses generic smart directives for the dashboard and recipes list and smart components elsewhere.

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

## Generic smart directive

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

Sometimes the value we need from the store is dynamically stored by a key.
This means that we need to pass a value into our smart directive that enables us to get the correct value.
We create a directive that sets up store selectors and assigns them to outputs in the constructor based on the passed key in the input.
```Typescript
@Directive({ selector: '[herosList]' })
export class HerosListDirective {
  // This observable value is needed to tie the outputs to something in the constructor
  private herosLink$ = new BehaviorSubject<string | null>(null);
  @Input() set herosLink(link: string) {
    if (link !== this.recipesLink) {
      this.herosLink$.next(link);
    }
  }
  get herosLink(): string | null { return this.herosLink$.value; }
  @Output() heros: Observable<Hero[]>;
  @Output() herosLoading: Observable<boolean>;
  @Output() herosLoadError: Observable<Error | null>;

  constructor(herosStateFacade: HerosStateFacade) {
    // Each switchMap checks if it has the link to pull the selector data. If not, a default is provided.
    this.heros = this.herosLink$.pipe(switchMap((link) => link ? herosStateFacade.heros$(link) : of([])));
    this.herosLoading = this.herosLink$.pipe(switchMap((link) => link ? herosStateFacade.herosLoading$(link) : of(true)));
    this.herosLoadError = this.herosLink$.pipe(switchMap((link) => link ? herosStateFacade.herosLoadError$(link) : of(null)));
  }
}
```

You can then use the directive in your template to provide your components the data they need.
```html
<hero-list
  #heroList
  herosList
  [herosLink]="herosLink"
  (heros)="heroList.heros = $event"
  (herosLoading)="heroList.loading = $event"
  (herosLoadError)="heroList.error = $event"
></hero-list>
```
