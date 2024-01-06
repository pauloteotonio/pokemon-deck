import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CardListModel } from 'src/app/feature/models/card-list.model';
import { DeckModel } from 'src/app/feature/models/deck-list.model';
import { PokemonService } from 'src/app/feature/services/pokemon.service';


@Component({
  selector: 'app-pokemon-management',
  templateUrl: './pokemon-management.component.html',
  styleUrls: ['./pokemon-management.component.css'],
})
export class PokemonManagementComponent implements OnInit {
  cards: CardListModel[] = [];
  selectedCards: CardListModel[] = [];
  buttomDisable: boolean = true;
  displayedColumns: string[] = ['select', 'image'];
  deckForm!: FormGroup
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 25;
  loading = true;

  constructor(
    public dialogRef: MatDialogRef<PokemonManagementComponent>,
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) private data: {deck: DeckModel}
  ) { 
    
  }
 
  ngOnInit(): void {
    this.deckForm = this.formBuilder.group({
      nome: [this.data?.deck?.nomeDoBaralho, [Validators.required, Validators.minLength(5), Validators.maxLength(18)]]
    })
    this.selectedCards = this.data?.deck?.cartasSelecionadas ?? [];
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getAllCards().subscribe((response) => {
      this.loading = false;
      this.cards = response.data.map((card: CardListModel) => ({
        ...card,
        selected: this.data?.deck?.cartasSelecionadas?.some(cardSelected => cardSelected.id == card.id)
      }));
      this.verifyButtom();
    });
  }

  toggleSelection(card: CardListModel): void {
    card.selected = !card.selected;

    if (card.selected) {
      this.selectedCards.push(card);      
    } else {
      this.selectedCards = this.selectedCards.filter(selectedCard => selectedCard.id != card.id)
    }
    this.verifyButtom();
  }

  private verifyButtom() {
    this.buttomDisable = this.selectedCards.length < 2 || this.selectedCards.length > 60;
  }

  uniqueTypes(){
    const typesList: string[] = [];
    this.selectedCards.forEach((card) => {
      typesList.push(...card.types)
    })
    return new Set(typesList)?.size;
  }

  enviarFormulario() {
    if (this.deckForm.valid && this.selectedCards.length > 0) {
      const dados = {
        nomeDoBaralho: this.deckForm.value.nome,
        cartasSelecionadas: this.selectedCards,
        numeroCartas: this.selectedCards.length,
        cartasTreinador: this.selectedCards.filter(card => card.superType == 'Trainer')?.length,
        uniqueTypes: this.uniqueTypes()
      };
      
      this.dialogRef.close(dados);
    }
  }

}
