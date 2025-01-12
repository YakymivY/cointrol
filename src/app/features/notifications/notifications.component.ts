import { Component, OnInit } from '@angular/core';
import { TelegramLoginComponent } from './components/telegram-login/telegram-login.component';
import { NotificationsService } from './services/notifications.service';
import { TelegramUser } from './interfaces/telegram-user.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { assetExistsValidator } from '../tracker/validators/asset-exists.validator';
import { positiveNumberValidator } from '../tracker/validators/positive-number.validator';
import { PortfolioService } from '../tracker/services/portfolio.service';
import { PricePipe } from '../tracker/pipes/price.pipe';
import { AlertData } from './interfaces/alert-data.interface';
import { AddAlert } from './interfaces/add-alert.interface';
import { AccountBarComponent } from './components/account-bar/account-bar.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    TelegramLoginComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    AsyncPipe,
    PricePipe,
    DecimalPipe,
    AccountBarComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  telegramAccount!: TelegramUser;

  alerts: AlertData[] = [];

  notificationsForm: FormGroup;
  filteredOptions: Observable<string[]> | undefined;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  avaliableTokens: string[] = [
    'BTC',
    'ETH',
    'USDT',
    'XRP',
    'BNB',
    'SOL',
    'DOGE',
    'USDC',
    'ADA',
    'TRX',
    'AVAX',
    'LINK',
    'TON',
    'SHIB',
    'SUI',
    'XLM',
    'DOT',
    'HBAR',
    'BCH',
    'LEO',
    'UNI',
    'LTC',
    'HYPE',
    'PEPE',
    'NEAR',
    'USDe',
    'BGB',
    'DAI',
    'APT',
    'AAVE',
    'ICP',
    'CRO',
    'POL',
    'MNT',
    'ETC',
    'VET',
    'RENDER',
    'XMR',
    'OM',
    'TAO',
    'ARB',
    'FET',
    'ENA',
    'FIL',
    'ALGO',
    'KAS',
    'OKB',
    'FTM',
    'ATOM',
    'VIRTUAL',
    'STX',
    'BONK',
    'OP',
    'TIA',
    'IMX',
    'ONDO',
    'THETA',
    'INJ',
    'GRT',
    'WIF',
    'SEI',
    'WLD',
    'MOVE',
    'RUNE',
    'FDUSD',
    'JASMY',
    'PENGU',
    'FLOKI',
    'LDO',
    'FLR',
    'MKR',
    'SAND',
    'BEAM',
    'KCS',
    'XTZ',
    'PYTH',
    'KAIA',
    'RAY',
    'QNT',
    'GALA',
    'BRETT',
    'EOS',
    'ENS',
    'HNT',
    'FTT',
    'GT',
    'XDC',
    'FLOW',
    'BTT',
    'JUP',
    'BSV',
    'AIOZ',
    'AERO',
    'AR',
    'STRK',
    'IOTA',
    'CRV',
    'DYDX',
    'CORE',
    'NEO',
  ];
  assetsUsed: string[] = this.avaliableTokens;
  price!: number;
  token!: string;
  direction!: 'above' | 'below';
  target_price: number = 0;

  tokenField;
  targetPriceField;

  private destroy$ = new Subject<void>();

  constructor(
    private notificationsService: NotificationsService,
    private portfolioService: PortfolioService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.notificationsForm = this.fb.group({
      token: ['', [Validators.required], [assetExistsValidator(http)]],
      target_price: ['', [Validators.required, positiveNumberValidator()]],
    });

    this.tokenField = this.notificationsForm.get('token');
    this.targetPriceField = this.notificationsForm.get('target_price');
  }

  ngOnInit(): void {
    //fetch telegram account of the user
    this.getUserAccount();

    //fetch user alerts
    this.getAlerts();

    //form list of assets for autocomplete
    this.filteredOptions = this.tokenField?.valueChanges.pipe(
      startWith(''),
      debounceTime(300), //delay
      distinctUntilChanged(),
      switchMap((value) => this._filterAndFetch(value || '')),
    );

    //track change of asset field
    this.tokenField?.valueChanges.subscribe((value) => {
      const hasValue$: Observable<boolean> | undefined =
        this.filteredOptions?.pipe(map((array) => array.includes(value)));
      hasValue$?.subscribe((hasValue) => {
        if (hasValue) {
          this.portfolioService
            .fetchExrate(value)
            ?.pipe(takeUntil(this.destroy$))
            .subscribe((price) => {
              this.price = price;
              this.token = value;
            });
        }
      });
    });

    this.targetPriceField?.valueChanges.subscribe((value) => {
      this.target_price = value;
      if (this.target_price >= this.price) {
        this.direction = 'above';
      } else {
        this.direction = 'below';
      }
    });
  }

  getUserAccount(): void {
    this.notificationsService.getTelegramAccount().subscribe({
      next: (response) => {
        this.telegramAccount = response;
      },
      error: (error: Error) => {
        console.error('A telegram account was not received', error);
      },
    });
  }

  getAlerts(): void {
    this.notificationsService.getUserAlerts().subscribe({
      next: (response) => {
        this.alerts = response;
      },
      error: (error: Error) => {
        console.error('Failed to fetch user alerts', error);
      },
    });
  }

  activateAlert(id: number): void {
    this.notificationsService.activateAlert(id).subscribe({
      next: () => {
        console.log('Alert successfully activated');
      },
      error: (error: Error) => {
        console.error('Error occured while activating the alert', error);
      },
    });
  }

  deleteAlert(id: number): void {
    this.notificationsService.deleteAlert(id).subscribe({
      next: () => {
        console.log('Alert successfully deleted');
      },
      error: (error: Error) => {
        console.error('Error occured while deleting the alert', error);
      },
    });
  }

  private _filterAndFetch(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    //find in hardcoded values
    const localMatches = this.assetsUsed.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );

    if (localMatches.length > 0) {
      return of(localMatches);
    }

    //fetch from server
    return this.http
      .get<
        string[]
      >(`${environment.API_BASE_URL}integrations/assets-list?ticker=${value}`)
      .pipe(
        catchError(() => {
          return of([]);
        }),
      );
  }

  onSubmit() {
    if (this.notificationsForm.valid && this.direction && this.price) {
      const formData: AddAlert = {
        token: this.token,
        target_price: this.target_price,
        direction: this.direction,
        active: true,
        is_triggered: false,
      };

      //create save request
      this.notificationsService.createAlert(formData).subscribe({
        next: () => {
          console.log('Alert created successfully');
        },
        error: (error: Error) => {
          console.error('Error creating new alert:', error.message);
        }
      })
    }
  }

  resetInput() {
    this.tokenField?.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
