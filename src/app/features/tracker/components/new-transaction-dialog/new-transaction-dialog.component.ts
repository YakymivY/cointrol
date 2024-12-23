import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { environment } from '../../../../../environments/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { assetExistsValidator } from '../../validators/asset-exists.validator';
import { TransactionRequest } from '../../interfaces/transaction-request.interface';
import { PortfolioService } from '../../services/portfolio.service';
import { positiveNumberValidator } from '../../validators/positive-number.validator';

@Component({
  selector: 'app-new-transaction-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButtonToggleModule,
    MatButtonModule
  ],
  templateUrl: './new-transaction-dialog.component.html',
  styleUrl: './new-transaction-dialog.component.css',
})
export class NewTransactionDialogComponent implements OnInit {
  newTransactionForm: FormGroup;
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = [
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
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  assetField; typeField; amountField; priceField;

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
    });

    this.assetField = this.newTransactionForm.get('asset');
    this.typeField = this.newTransactionForm.get('type');
    this.amountField = this.newTransactionForm.get('amount');
    this.priceField = this.newTransactionForm.get('price');
  }

  ngOnInit(): void {
    this.filteredOptions = this.newTransactionForm
      .get('asset')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300), //set delay
        distinctUntilChanged(), //trigger only if value changes
        switchMap((value) => this._filterAndFetch(value || '')),
      );
  }

  private _filterAndFetch(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    //find in hardcoded values
    const localMatches = this.options.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );

    if (localMatches.length > 0) {
      return of(localMatches);
    } 

    //fetch from server
    return this.http.get<string[]>(`${environment.API_BASE_URL}integrations/assets-list?ticker=${value}`).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }

  onSubmit() {
    if (this.newTransactionForm.valid) {
      this.isSubmitting = true;
      //get amount from input
      const amount: number = this.newTransactionForm.get('amount')?.value;
      //convert it to neg if it's sell tx
      const signedAmount: number = this.newTransactionForm.get('type')?.value == 'sell' ? -amount : amount;
      //TODO add storage
      const formData: TransactionRequest = {
        asset: this.newTransactionForm.get('asset')?.value,
        amount: signedAmount,
        price: this.newTransactionForm.get('price')?.value,
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
        }
      })
    }
  }

  resetInput() {
    this.newTransactionForm.get('asset')?.setValue('');
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
}
