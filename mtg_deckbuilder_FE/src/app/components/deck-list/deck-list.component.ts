import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/interfaces/card.interface';
import { DeckInterface } from 'src/app/interfaces/deck.interface';
import { DeckSelectionService } from 'src/app/services/deck-selection.service';
import { DeckService } from 'src/app/services/deck.service';
import { SelectedCard } from '../../interfaces/selected-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
})
export class DeckListComponent implements OnInit {
  decks: DeckInterface[];
  private subscription: Subscription;
  selectedDeck: DeckInterface;
  deckLength: number;
  deckCards: SelectedCard[];

  artifacts: Card[];
  artifactsLength: number;
  creatures: Card[];
  creaturesLength: number;
  enchantments: Card[];
  enchantmentsLength: number;
  instants: Card[];
  sorceries: Card[];
  planeswalkers: Card[];
  lands: Card[];

  constructor(public deckSrv: DeckService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.deckSrv.decks$.subscribe((decks) => {
      this.decks = decks;
    });
    this.deckSrv.getUsersDeck().subscribe();
  }

  getCards(id: number): void {
    this.deckSrv.getDeckById(id).subscribe((deck) => {
      this.selectedDeck = deck;

      this.deckLength = this.selectedDeck.cards.length;

      this.artifacts = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Artifact')
      );

      this.artifactsLength = this.artifacts.length;

      this.creatures = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Creature')
      );

      this.creaturesLength = this.creatures.length;

      this.enchantments = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Enchantment')
      );

      this.enchantmentsLength = this.enchantments.length;

      this.instants = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Instant')
      );
      this.sorceries = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Sorcery')
      );
      this.planeswalkers = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Planeswalker')
      );
      this.lands = this.selectedDeck.cards.filter((card) =>
        card.typeLine?.includes('Land')
      );
    });
  }

  onDeleteDeck(id: number) {
    this.deckSrv.deleteUsersDeck(id).subscribe({
      next: (message) => {
        console.log(message);
      },
      error: (err) => {
        console.log(err);
      },
    });
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
