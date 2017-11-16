import { Component, Inject, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {DeckId} from "../deck/deck";

@Component({
    selector: 'app-save-deck-dialog',
    templateUrl: './save-deck-dialog.component.html',
    styleUrls: ['./save-deck-dialog.component.css']
})
export class SaveDeckDialogComponent implements OnInit {

    newDeckName: string;
    isShared: boolean;



    constructor(public deckService : DeckService,
                public matDialogRef : MatDialogRef<SaveDeckDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {deck: DeckId},
                public snackBar: MatSnackBar) {
        console.log("construcing SaveDeckDialogComponent");
        console.log(data);
        this.newDeckName = this.data.deck.name;
        this.isShared = this.data.deck.isShared;
    }


    ngOnInit() {
    }

    public editAddedDeck(): void {
        if (this.data.deck.classId) {
            this.deckService.editClassDeck(
                this.data.deck.id,
                this.newDeckName,
                this.isShared).then(
                succeeded => {
                    //this.cardAddSuccess = true
                    this.snackBar.open("Edited deck", null, {
                        duration: 2000,
                    });
                    //this.refreshDeck();
                },
                err => {
                    console.log(err);
                    this.snackBar.open("Error editing deck", null, {
                        duration: 2000,
                    });
                });
            this.matDialogRef.close();
        } else {
            this.deckService.editDeck(
                this.data.deck.id,
                this.newDeckName).then(
                succeeded => {
                    //this.cardAddSuccess = true
                    this.snackBar.open("Edited deck", null, {
                        duration: 2000,
                    });
                    //this.refreshDeck();
                },
                err => {
                    console.log(err);
                    this.snackBar.open("Error editing deck", null, {
                        duration: 2000,
                    });
                });
            this.matDialogRef.close();
        }
    }
}
