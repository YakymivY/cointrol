import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PricePipe } from '../tracker/pipes/price.pipe';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NumberAbbreviationPipe } from '../../shared/pipes/number-abbreviation.pipe';
import { CoinComplex } from './interfaces/coin-complex.interface';
import { RouterModule } from '@angular/router';
import { TokenlistService } from './services/tokenlist.service';
import { CoinComplexOutput } from './interfaces/coin-complex-output.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-tokenlist',
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatPaginator,
        PricePipe,
        DecimalPipe,
        NumberAbbreviationPipe,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
    ],
    templateUrl: './tokenlist.component.html',
    styleUrl: './tokenlist.component.css'
})
export class TokenlistComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'rank',
    'asset',
    'price',
    'change',
    'mcap',
    'volume',
    'ath',
    'day',
  ];
  displayedCardsTokens: string[] = ['BTC', 'ETH', 'SOL'];

  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  cards: CoinComplex[] = [];
  savedTokenListData!: CoinComplex[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchForm: FormGroup;
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
  searchField;

  constructor(
    private tokenlistService: TokenlistService,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.searchForm = this.fb.group({
      search: [''],
    });

    this.searchField = this.searchForm.get('search');
  }

  ngOnInit(): void {
    this.loadTokenlistData(this.currentPage, this.pageSize);
    this.loadCardsData(this.displayedCardsTokens);

    //form list of assets for autocomplete
    this.filteredOptions = this.searchField?.valueChanges.pipe(
      startWith(''),
      debounceTime(300), //set delay
      distinctUntilChanged(), //trigger only if value changes
      switchMap((value) => this._filterAndFetch(value || '')),
    );

    //clear table
    this.searchField?.valueChanges.subscribe((value) => {
      if (value === '') {
        this.dataSource.data = this.savedTokenListData;
      }
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event) => {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.loadTokenlistData(this.currentPage, this.pageSize);
    });
  }

  loadCardsData(tickers: string[]): void {
    const tickersString: string = tickers.join(',');
    this.tokenlistService.getCertainTokenData(tickersString).subscribe({
      next: (response: CoinComplexOutput) => {
        this.cards = response.data;
      },
      error: (error: Error) => {
        console.error('Error fetching card tokens data: ', error);
      },
    });
  }

  loadTokenlistData(page: number, size: number): void {
    this.tokenlistService.getTokenlistData(page, size).subscribe({
      next: (response: CoinComplexOutput) => {
        this.dataSource.data = response.data;
        this.totalRecords = response.total;
        this.savedTokenListData = response.data;
      },
      error: (error: Error) => {
        console.error('Error fetching tokenlist data: ', error);
      },
    });
  }

  onSearch(): void {
    const value = this.searchField?.value;
    if (value) {
      this.tokenlistService.getCertainTokenData(value).subscribe({
        next: (response: CoinComplexOutput) => {
          this.dataSource.data = response.data;
        },
        error: (error: Error) => {
          console.error('Could not fetch search token data');
        }
      })
    }
  }

  resetInput(): void {
    this.searchField?.setValue('');
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
}
