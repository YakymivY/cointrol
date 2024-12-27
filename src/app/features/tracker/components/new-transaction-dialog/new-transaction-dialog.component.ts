import {
  Component,
  computed,
  effect,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
  tap,
} from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { assetExistsValidator } from '../../validators/asset-exists.validator';
import { TransactionRequest } from '../../interfaces/transaction-request.interface';
import { PortfolioService } from '../../services/portfolio.service';
import { positiveNumberValidator } from '../../validators/positive-number.validator';
import { storageExistsValidator } from '../../validators/storage-exists.validator';
import { TransactionType } from '../../enums/transaction-type.enum';
import { OwnedAsset } from '../../interfaces/owned-asset.interface';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-new-transaction-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButtonToggleModule,
    MatButtonModule,
    PricePipe,
    DecimalPipe,
  ],
  templateUrl: './new-transaction-dialog.component.html',
  styleUrl: './new-transaction-dialog.component.css',
})
export class NewTransactionDialogComponent implements OnInit, OnDestroy {
  newTransactionForm: FormGroup;
  filteredOptions: Observable<string[]> | undefined;
  avaliableAssets: string[] = [
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
  assetsUsed: string[] = this.avaliableAssets;
  transactionType: TransactionType | null = null;
  ownedAssets: OwnedAsset[] = [];
  assetMax: number | null = null;
  //currentExrate$: Observable<number> | null = null;

  private amount = signal<number>(0);
  private price = signal<number>(0);
  //computed total with additional formatting
  total = computed(() => {
    const calculatedTotal = this.amount() * this.price();
    return isNaN(calculatedTotal) ? 0 : calculatedTotal;
  });

  storages: Observable<string[]> | undefined;
  filteredStorages: Observable<string[]> | undefined;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  assetField;
  typeField;
  amountField;
  priceField;
  storageField;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<NewTransactionDialogComponent>,
    private portfolioService: PortfolioService,
  ) {
    this.newTransactionForm = this.fb.group({
      asset: ['', [Validators.required], [assetExistsValidator(http)]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required, positiveNumberValidator()]],
      price: ['', [Validators.required, positiveNumberValidator()]],
      storage: ['', [], [storageExistsValidator(http)]],
    });

    this.assetField = this.newTransactionForm.get('asset');
    this.typeField = this.newTransactionForm.get('type');
    this.amountField = this.newTransactionForm.get('amount');
    this.priceField = this.newTransactionForm.get('price');
    this.storageField = this.newTransactionForm.get('storage');

    effect(() => {
      //update signals when form inputs change
      this.amountField?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.amount.set(Number(value) || 0);
        });

      this.priceField?.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.price.set(Number(value) || 0);
        });
    });
  }

  ngOnInit(): void {
    this.storages = this.portfolioService.getListOfStorages();

    //form list of assets for autocomplete
    this.filteredOptions = this.assetField?.valueChanges.pipe(
      startWith(''),
      debounceTime(300), //set delay
      distinctUntilChanged(), //trigger only if value changes
      switchMap((value) => this._filterAndFetch(value || '')),
    );

    //form list of storages for autocomplete
    this.filteredStorages = this.storageField?.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => this._filterStorages(value || '')),
    );

    //track user type choice
    this.typeField?.valueChanges.subscribe((value) => {
      //set transaction type variable
      this.transactionType = value;

      //fetch user assets if there are none already
      if (this.transactionType === 'sell' && this.ownedAssets.length === 0) {
        this.portfolioService.getUserAssets().subscribe({
          next: (response: OwnedAsset[]) => {
            this.ownedAssets = response;
            this.updateAssetList();
          },
          error: (error: Error) => {
            console.error(
              'An error occured while fetching user assets:',
              error.message,
            );
          },
        });
      } else {
        this.updateAssetList();
      }
    });

    //track change of asset field
    this.assetField?.valueChanges.subscribe((value) => {
      const hasValue$: Observable<boolean> | undefined =
        this.filteredOptions?.pipe(map((array) => array.includes(value)));
      hasValue$?.subscribe((hasValue) => {
        if (hasValue) {
          this.portfolioService
            .fetchExrate(value)
            ?.pipe(takeUntil(this.destroy$))
            .subscribe((price) => {
              this.price.set(price);
              this.priceField?.setValue(price, { emitEvent: false });
            });
        }
      });
    });
  }

  private updateAssetList() {
    //change asset list shown
    if (this.transactionType === 'sell') {
      this.assetsUsed = this.ownedAssets.map((item) => item.asset);
      if (
        !this.ownedAssets
          .map((item) => item.asset)
          .includes(this.assetField?.value)
      ) {
        this.assetField?.setValue('');
        this.priceField?.setValue('');
        this.amountField?.setValue('');
      }
    } else {
      this.assetsUsed = this.avaliableAssets;
    }
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

  private _filterStorages(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    //ensure `this.storages` is defined before filtering
    if (!this.storages) {
      return new Observable((observer) => {
        observer.next([]); //return an empty array when storages is undefined
        observer.complete();
      });
    }

    //apply filtering logic
    return this.storages.pipe(
      map((items) =>
        items.filter((item) => item.toLowerCase().includes(filterValue)),
      ),
    );
  }

  setMaxAmount() {
    const chosenAsset: string = this.assetField?.value;
    if (this.ownedAssets.map((item) => item.asset).includes(chosenAsset)) {
      const assetObj: OwnedAsset[] = this.ownedAssets.filter(
        (item) => item.asset === chosenAsset,
      );
      this.amountField?.setValue(assetObj[0].amount);
    }
  }

  onSubmit() {
    if (this.newTransactionForm.valid) {
      this.isSubmitting = true;
      //get amount from input
      const amount: number = this.newTransactionForm.get('amount')?.value;
      //convert it to neg if it's sell tx
      const signedAmount: number =
        this.newTransactionForm.get('type')?.value == 'sell' ? -amount : amount;
      //TODO add storage
      const formData: TransactionRequest = {
        asset: this.assetField?.value,
        amount: signedAmount,
        price: this.priceField?.value,
        storage: this.storageField?.value,
      };

      //create save request
      this.portfolioService.addTransaction(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.errorMessage = null;
          this.dialogRef.close();
        },
        error: (error: Error) => {
          this.isSubmitting = false;
          this.errorMessage = error.message;
        },
      });
    }
  }

  resetInput() {
    this.assetField?.setValue('');
  }

  resetStorageInput() {
    this.storageField?.setValue('');
  }

  close() {
    this.dialogRef.close();
  }

  getAssets() {
    const headers = new HttpHeaders({
      'X-CMC_PRO_API_KEY': 'ec5d38ed-ac8e-4d21-9aa3-3b1064b40177',
    });
    this.http
      .get('/api/v1/cryptocurrency/map?sort=cmc_rank', { headers })
      .subscribe({
        next: (response: any) => {
          const top100 = response.data
            .slice(0, 105)
            .map((obj: any) => obj.symbol);
          const top100set = [...new Set(top100)];
          console.log(top100set);
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
