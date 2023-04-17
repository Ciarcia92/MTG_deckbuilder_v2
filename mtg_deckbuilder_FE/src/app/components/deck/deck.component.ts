import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { DeckInterface } from 'src/app/interfaces/deck.interface';
import { SelectedCard } from 'src/app/interfaces/selected-card';
import { DeckService } from 'src/app/services/deck.service';
import { DeckbuilderService } from 'src/app/services/deckbuilder.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  selectedCards: SelectedCard[] = [];
  deckName: string;
  updatedCards$: BehaviorSubject<SelectedCard[]> = new BehaviorSubject([]);
  updatedSelectedDeckCards$: BehaviorSubject<Card[]> = new BehaviorSubject([]);
  deckList: DeckInterface[];
  selectedDeck: DeckInterface;
  showDeckList: boolean = true;
  showselectedDeck: boolean = false;

  constructor(
    private deckbuilderSrv: DeckbuilderService,
    private deckSrv: DeckService
  ) {
  }

  ngOnInit(): void {
    this.selectedCards = [];
    this.deckSrv.selectedCards$.subscribe((cards) => {
      this.selectedCards = cards;
    });

    this.deckSrv.getUsersDeck().subscribe((data) => {
      this.deckList = data;
    });
    this.deckbuilderSrv.deckCreatedEvent.subscribe(() => {
      this.deckSrv.getUsersDeck().subscribe((data) => {
        this.deckList = data;
      });
    });

    // this.deckSrv.getDeckIslands().subscribe((islands) => {
    //   this.islands = islands;
    // })
    // this.deckSrv.islandAdded.subscribe(() => {
    //   this.deckSrv.getDeckIslands().subscribe((islands) => {
    //     this.islands = islands;
    //   })
    // })
    // this.deckSrv.mountainAdded.subscribe(() => {
    //   this.deckSrv.getDeckMountains().subscribe((mountains) => {
    //     this.mountains = mountains;
    //   })
    // })
    // this.deckSrv.getDeckMountains().subscribe((mountains) => {
    //   this.mountains = mountains;
    // })
    // this.deckSrv.plainAdded.subscribe(() => {
    //   this.deckSrv.getDeckPlains().subscribe((plains) => {
    //     this.plains = plains;
    //   })
    // })
    // this.deckSrv.getDeckPlains().subscribe((plains) => {
    //   this.plains = plains;
    // })
    // this.deckSrv.forestAdded.subscribe(() => {
    //   this.deckSrv.getDeckForests().subscribe((forests) => {
    //     this.forests = forests;
    //   })
    // })
    // this.deckSrv.getDeckForests().subscribe((forests) => {
    //   this.forests = forests;
    // })
    // this.deckSrv.swampAdded.subscribe(() => {
    //   this.deckSrv.getDeckSwamps().subscribe((swamps) => {
    //     this.swamps = swamps;
    //   })
    // })
    // this.deckSrv.getDeckSwamps().subscribe((swamps) => {
    //   this.swamps = swamps;
    // })

  }

  selectDeck(id: number, e: Event) {
    // this.deckSrv.islandAdded.subscribe(() => {
    //   this.deckSrv.getDeckIslands().subscribe((islands) => {
    //     this.islands = islands;
    //   })
    // })
    // this.deckSrv.getDeckIslands().subscribe((islands) => {
    //   console.log('island by selecteddeck', islands);
    //   this.islands = islands;
    // })
    console.log(id);
    e.stopPropagation();
    this.selectedCards = [];
    const deck = document.getElementById('selectedDeck');
    const listOfDeck = document.getElementById('deckList');

    this.deckSrv.getDeckById(id).subscribe((deck: DeckInterface) => {
      this.selectedDeck = deck;
      console.log(this.selectedDeck);



      if (!!this.selectedDeck) {
        this.showDeckList = false;
        this.showselectedDeck = true;
        localStorage.setItem('deckOpened', 'true');
        localStorage.setItem('deckName', this.selectedDeck.name);
      }
    });
  }

  backToDeckList() {
    this.deckSrv.clearSelectedCards();
    this.selectedCards = [];
    this.showDeckList = true;
    this.showselectedDeck = false;
    const deckOpened = localStorage.getItem('deckOpened');
    localStorage.removeItem('deckName');
    // this.deckSrv.getDeckIslands().subscribe((islands) => {
    //   console.log('island', islands);
    //   this.islands = islands;
    // })
    // this.forests = 0;
    // this.islands = 0;
    // this.mountains= 0;
    // this.plains = 0;
    // this.swamps = 0;

    if (deckOpened === 'true') {
      localStorage.setItem('deckOpened', 'false');
    }
  }

  onDeleteCard(cardId: string, deckId?: number, entryPoint?: string) {
    const index = this.selectedCards.findIndex((c) => c.oracleId === cardId);
    console.log('index', index);

    if (!!entryPoint && entryPoint === 'selectedDeckCard') {
      this.onDeleteCardFromSelectedDeck(cardId, deckId);
    } else if (index >= 0) {
      this.deckSrv.onDeleteDeckCard(cardId, deckId).subscribe({
        next: () => {
          console.log('Card deleted successfully');
          // remove the deleted card from the selectedCards array
          this.selectedCards.splice(index, 1);
          console.log('splice da nuovo deck');
          // emit the updated selectedCards array
          this.updatedCards$.next(this.selectedCards);
        },
        error: (error) => {
          console.error('Error deleting card:', error);
        },
      });
    }
  }

  onDeleteCardFromSelectedDeck(cardId: string, deckId: number) {
    console.log(cardId);
    let indexFromSelectedDeck = Math.abs(
      this.selectedDeck.cards.findIndex((c) => c.oracle_id === cardId)
    );
    console.log(indexFromSelectedDeck, this.selectedDeck.cards);

    this.deckSrv.onDeleteDeckCard(cardId, deckId).subscribe({
      next: () => {
        console.log('Card deleted successfully');
        // remove the deleted card from the selectedCards array
        console.log(this.selectedDeck.cards);
        this.selectedDeck.cards.splice(indexFromSelectedDeck, 1);
        console.log(
          'entrato in splicesss da selectedDeck',
          indexFromSelectedDeck
        );
        // emit the updated selectedCards array
        this.updatedSelectedDeckCards$.next(this.selectedDeck.cards);
      },
      error: (error) => {
        console.error('Error deleting card:', error);
      },
    });
  }

  ngOnDestroy() {
    this.selectedCards = [];

    this.deckSrv.clearSelectedCards();
  }
}
