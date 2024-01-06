import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PokemonManagementComponent } from 'src/app/feature/dialogs/deck-maragement/pokemon-management/pokemon-management.component';
import { DeckModel } from 'src/app/feature/models/deck-list.model';
import { PokemonService } from 'src/app/feature/services/pokemon.service';


@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html'
})
export class DeckListComponent implements OnInit, OnDestroy {

  deckList: DeckModel[] = [];
  subscription!: Subscription;
  showDetails = false;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subscription = this.pokemonService.getDeckList().subscribe(list => {
      this.deckList = list;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get() {
    this.pokemonService.getPokemonType().subscribe(data => {
    });
  }

  openDialog(deck?: DeckModel, index?: number) {
    this.dialog.open(PokemonManagementComponent, {
      width: '25%',
      height: '90%',
      data: {
        deck
      }
    }).afterClosed().subscribe((deck: DeckModel) => {
      if (index != null) {
        this.pokemonService.updateDeck(index, deck);
      } else {
        this.pokemonService.saveDeck(deck);
      }
    });
  }

  deleteDeck(index: number){
    this.pokemonService.deleteDeck(index);
  }

  showDetailsToggle(){
    this.showDetails = true;
  }
}
