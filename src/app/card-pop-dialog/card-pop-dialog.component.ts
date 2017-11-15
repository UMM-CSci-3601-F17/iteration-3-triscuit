
import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {Card, CardId} from "../card/card";

@Component({
    selector: 'app-card-pop-dialog',
    templateUrl: './card-pop-dialog.component.html',
    styleUrls: ['./card-pop-dialog.component.scss']
})

export class CardPopDialogComponent implements OnInit {

    constructor(public matDialogRef: MatDialogRef<CardPopDialogComponent>,
                @Inject(MAT_DIALOG_DATA)
                public data: {card: Card}) {

    }

    word: string;
    synonym: string[];
    antonym: string[];
    general_sense: string[];
    example_usage: string[];


    ngOnInit() {
        this.word = this.data.card.word;
        this.synonym = this.data.card.synonym;
        this.antonym = this.data.card.antonym;
        this.general_sense = this.data.card.general_sense;
        this.example_usage = this.data.card.example_usage;

    }
}

