import { Component, Inject, OnInit } from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";
import {Card, CardId} from "../card/card";
import { CovalentVirtualScrollModule } from '@covalent/core';
@Component({
  selector: 'app-save-card-dialog',
  templateUrl: './save-card-dialog.component.html',
  styleUrls: ['./save-card-dialog.component.css']
})
export class SaveCardDialogComponent implements OnInit {

    newCardWord: string;
    newCardSynonym: string[] = [];
    newCardAntonym: string[] = [];
    newCardGeneral: string[] = [];
    newCardExample: string[] = [];



    constructor(public deckService : DeckService, public matDialogRef : MatDialogRef<SaveCardDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: {card: CardId, deckId: string},
                public snackBar: MatSnackBar) {
        console.log("constructing SaveCardDialogComponent");
        console.log(data);
        this.newCardWord = data.card.word;
        this.newCardSynonym = data.card.synonym;
        console.log(this.newCardSynonym.length);
        this.newCardAntonym = data.card.antonym;
        this.newCardGeneral = data.card.general_sense;
        this.newCardExample = data.card.example_usage;
        this.fillHints(this.newCardSynonym);
        this.fillHints(this.newCardAntonym);
        this.fillHints(this.newCardGeneral);
        this.fillHints(this.newCardExample);
        console.log(this.newCardSynonym);
    }


    ngOnInit() {
    }

    public fillHints(hints:string[]):void{
        var i = 0;
        while(hints.length<5){
            hints.push("");
        }

    }
    public deleteEmptyFields():void {
        for(var i = 0; i < this.newCardSynonym.length; i++){
            if(this.newCardSynonym[i]==''){
                console.log("DELETED at index " + i);
                this.newCardSynonym.splice(i,1);
                i--;
            }
        }
        for(var i = 0; i < this.newCardAntonym.length; i++){
            if(this.newCardAntonym[i]==''){
                console.log("DELETED at index " + i);
                this.newCardAntonym.splice(i,1);
                i--;
            }
        }
        for(var i = 0; i < this.newCardGeneral.length; i++){
            if(this.newCardGeneral[i]==''){
                console.log("DELETED at index " + i);
                this.newCardGeneral.splice(i,1);
                i--;
            }
        }
        for(var i = 0; i < this.newCardExample.length; i++){
            if(this.newCardExample[i]==''){
                console.log("DELETED at index " + i);
                this.newCardExample.splice(i,1);
                i--;
            }
        }
        console.log("methodState: " + this.newCardSynonym);

    }



    public editAddedCard(): void {
        this.deleteEmptyFields();
        console.log("length of altered array: "+this.newCardSynonym.length);
        this.deckService.editCard(
            this.data.deckId,
            this.data.card.id,
            this.newCardWord,
            this.newCardSynonym,
            this.newCardAntonym,
            this.newCardGeneral,
            this.newCardExample).then(
            succeeded => {
                //this.cardAddSuccess = true
                this.snackBar.open("Edited card", null, {
                    duration: 2000,
                });
                //this.refreshDeck();
            },
            err => {
                console.log(err);
                this.snackBar.open("Error editing card", null, {
                    duration: 2000,
                });
            });
        this.matDialogRef.close();
    }

}
