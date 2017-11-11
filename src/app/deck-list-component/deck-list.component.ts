import {Component, Input, OnInit} from '@angular/core';
import {DeckId} from "../deck/deck";
import {SaveDeckDialogComponent} from "../save-deck-dialog/save-deck-dialog.component"
import {MatDialog, MatSnackBar} from "@angular/material";
import {ClassService} from "../class/class.service";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css']
})
export class DeckListComponent implements OnInit {


    @Input() decks: DeckId[];

    @Input() title: string;

    @Input() canEdit?: boolean;

    @Input() canAdd?: boolean = false;

  constructor(public dialog: MatDialog, public classService: ClassService, public afAuth: AngularFireAuth) {

  }

    public editDeck(deck: DeckId) {
        this.dialog.open(SaveDeckDialogComponent, {
            data: {deck: deck}
        });
    };

    public canEditDeck(deck: DeckId): boolean {
        if (!deck) return false;
        if (deck.classId) {
            return this.classService.canEdit(deck.classId);
        } else if (deck.users) {
            return deck.users[this.afAuth.auth.currentUser.uid] &&
                deck.users[this.afAuth.auth.currentUser.uid].owner;
        }
    }

  ngOnInit() {
      //this.deckService.getDecks();
      //this.deckService.getUserDecks().subscribe(
      //    decks => {
      //        this.decks = decks;
      //    }
      //);
  }


}
