import {Component, Inject, OnInit} from '@angular/core';
import {DeckService} from "../deck/deck.service";
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-new-card-dialog',
    templateUrl: './new-card-dialog.component.html',
    styleUrls: ['./new-card-dialog.component.css']
})
export class NewCardDialogComponent implements OnInit {

    constructor(public deckService: DeckService,
                public matDialogRef: MatDialogRef<NewCardDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { deckId: string
                },
                public snackBar: MatSnackBar) {
    }

    newCardWord: string;
    newCardSynonym: string = "";
    newCardAntonym: string = "";
    newCardGeneral: string = "";
    newCardExample: string = "";
    newCardSynonyms: string[] = [];
    newCardAntonyms: string[] = [];
    newCardGenerals: string[] = [];
    newCardExamples: string[] = [];

    ngOnInit() {
    }

    public countHints(hints:string[], hint:string):number{
        var count = hints.length;
        if(hints.length==0&&hint==""){
            return 0;
        }
        if(hints.length!=0&&hint!=""){
            return count+1;
        }
        if (hint!=""){
            return count+1;
        }

        return count;
    }

    public pushNewHint(hintType:string,hint:string,hints:string[]): void{
        if(hint!==''&&hints.length<5) {
            hints.push(hint);
            this.snackBar.open("Added " + hintType + ": " + hint, null, {
                duration: 2000,
            });
        }
    }


    public addNewCard(): void {
        //This is simply making sure that people can't go into dev-tools
        // and disable the 'disabled' component and add as much as they want.
        if(this.newCardSynonym!=''&&this.newCardSynonyms.length<=5)
            this.newCardSynonyms.push(this.newCardSynonym);
        if(this.newCardAntonym!=''&&this.newCardAntonyms.length<=5)
            this.newCardAntonyms.push(this.newCardAntonym);
        if(this.newCardGeneral!=''&&this.newCardGenerals.length<=5)
            this.newCardGenerals.push(this.newCardGeneral);
        if(this.newCardExample!=''&&this.newCardExamples.length<=5)
            this.newCardExamples.push(this.newCardExample);
        // We pass the passwordState as a way to keep people from adding cards
        // to the DB if they got pass the password protection incorrectly
        this.deckService.addNewCard(this.data.deckId,
            this.newCardWord,
            this.newCardSynonyms,
            this.newCardAntonyms,
            this.newCardGenerals,
            this.newCardExamples).then(
            succeeded => {
                //this.cardAddSuccess = true;
                this.snackBar.open("Added card", null, {
                    duration: 2000,
                });
                //this.refreshDeck();
            },
            err => {
                console.log(err);
                this.snackBar.open("Error adding card", null, {
                    duration: 2000,
                });
            });
        this.matDialogRef.close();
    }

}
