import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game, GameFilters } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/games';

  // GET /games
  getGames() {
    return this.http.get<Game[]>(this.apiUrl);
  }

  // GET /games/5
  getGame(id: number) {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  // GET /games?title_like=texto
  searchGames(text: string) {
    const params = new HttpParams().set('title_like', text);
    return this.http.get<Game[]>(this.apiUrl, { params });
  }

  // GET /games?_page=2&_limit=5
  getGamesPage(page: number, limit: number) {
    const params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    return this.http.get<Game[]>(this.apiUrl, {
      params,
      observe: 'response'
    });
  }

  // GET /games?genre=RPG&platform=PC&title_like=...&price_gte=...&price_lte=...&_page=1&_limit=5
  getGamesFiltered(page: number, limit: number, filters: GameFilters) {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    if (filters.platform) {
      params = params.set('platform', filters.platform);
    }
    if (filters.title) {
      params = params.set('title_like', filters.title);
    }
    if (filters.minPrice) {
      params = params.set('price_gte', filters.minPrice);
    }
    if (filters.maxPrice) {
      params = params.set('price_lte', filters.maxPrice);
    }

    return this.http.get<Game[]>(this.apiUrl, {
      params,
      observe: 'response'
    });
  }
}
