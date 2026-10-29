import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private gameService = inject(GameService);

  games: Game[] = [];

  // Búsqueda por id
  foundGame: Game | null = null;
  idMessage = '';

  // Filtros
  selectedGenre = '';
  selectedPlatform = '';
  searchTitle = '';
  minPrice = '';
  maxPrice = '';

  // Paginación
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService
      .getGamesFiltered(this.currentPage, this.pageSize, {
        genre: this.selectedGenre,
        platform: this.selectedPlatform,
        title: this.searchTitle,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice
      })
      .subscribe(response => {
        this.games = response.body ?? [];
        this.totalItems = Number(response.headers.get('X-Total-Count') ?? 0);
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      });
  }

  // --- Búsqueda por id ---
  searchById(value: string): void {
    this.foundGame = null;
    this.idMessage = '';

    const id = Number(value);
    if (!value || Number.isNaN(id)) {
      this.idMessage = 'Introduce un ID válido.';
      return;
    }

    this.gameService.getGame(id).subscribe({
      next: game => (this.foundGame = game),
      error: () => (this.idMessage = `No existe ningún videojuego con ID ${id}.`)
    });
  }

  // --- Filtros ---
  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.loadGames();
  }

  onPlatformChange(platform: string): void {
    this.selectedPlatform = platform;
    this.currentPage = 1;
    this.loadGames();
  }

  onTitleSearch(text: string): void {
    this.searchTitle = text.trim();
    this.currentPage = 1;
    this.loadGames();
  }

  onPriceFilter(min: string, max: string): void {
    this.minPrice = min;
    this.maxPrice = max;
    this.currentPage = 1;
    this.loadGames();
  }

  // --- Paginación ---
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGames();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGames();
    }
  }
}
