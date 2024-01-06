import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/eviroments/eviroment';
import { DeckModel } from '../models/deck-list.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private deckData: DeckModel[] = [];
  

  constructor(private http: HttpClient) { }
  
  getDeckList() {
    return of(this.deckData);
  }

  saveDeck(deck: DeckModel){
    if(!deck) return
    this.deckData.push(deck);
  } 

  deleteDeck(index: number) {
    if (index >= 0 && index < this.deckData.length) {
      this.deckData.splice(index, 1);
    }
  }

  updateDeck(index: number, deck: DeckModel){
    this.deckData[index] = deck;
  }

  getPokemonType(): Observable<any> {
    return this.http.get(`${environment.pokemonApi}/types`);
  }

  getAllCards(): Observable<any> {
    return this.http.get(`${environment.pokemonApi}/cards`);
  }

}