import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {Deck} from "../deck/deck";
import {NewCardDialogComponent} from "../new-card-dialog/new-card-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Card, CardId} from "../card/card";
import {ClassService} from "../class/class.service";
import {AngularFireAuth} from "angularfire2/auth";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {SaveCardDialogComponent} from "../save-card-dialog/save-card-dialog.component";
import {CardPopDialogComponent} from "../card-pop-dialog/card-pop-dialog.component";

@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit, OnDestroy {

    id: string;
    deck: Deck;
    cards: CardId[];
    isShared: boolean;



    constructor(public afAuth: AngularFireAuth, public dialog: MatDialog, public deckService: DeckService, public snackBar: MatSnackBar, public classService: ClassService, private route: ActivatedRoute) {

    }

    openAddDialog() {
        let dialogRef = this.dialog.open(NewCardDialogComponent, {
            data: {deckId: this.id},
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    openCardDialog(card: Card) {
        let dialogRef = this.dialog.open(CardPopDialogComponent, {
            data: {card: card},
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }

    public canEdit(): boolean {
        if (!this.deck) return false;
        if (this.deck.classId) {
            return this.classService.canEdit(this.deck.classId);
        } else if (this.deck.users) {
            return this.deck.users[this.afAuth.auth.currentUser.uid] &&
                this.deck.users[this.afAuth.auth.currentUser.uid].owner;
        }
    }

    public canEditCard(card: CardId): boolean {
        if (card.users) {
            return card.users[this.afAuth.auth.currentUser.uid] &&
                card.users[this.afAuth.auth.currentUser.uid].owner;
        }
        return false;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];

            this.deckService.getDeck(this.id).takeUntil(componentDestroyed(this)).subscribe(
                deck => {
                    this.deck = deck;
                    this.isShared = this.deck.isShared;
                }
            );

            this.deckService.getDeckCards(this.id).takeUntil(componentDestroyed(this)).subscribe(cards => {
                this.cards = cards;
            });
        });
    }


    public editCard(card: CardId) {
        this.dialog.open(SaveCardDialogComponent, {
            data: {card: card, deckId: this.id}
        });
    };

    public deleteCard(cardId: string) {
        this.deckService.deleteCard(this.id, cardId).then(result => {
            this.snackBar.open("Deleted card", null, {
                duration: 2000,
            });
        }, err => {
            this.snackBar.open("Error deleting card", null, {
                duration: 2000,
            });
        })
    }

    ngOnDestroy() {

    }


}
