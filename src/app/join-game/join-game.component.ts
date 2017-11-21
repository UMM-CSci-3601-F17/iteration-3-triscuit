import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AngularFireDatabase} from "angularfire2/database";
import {Card} from "../card/card";
import {Observable} from "rxjs/Observable";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {CardState} from "../play-component/CardState";

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit, OnDestroy {

    constructor(private db: AngularFireDatabase, public snackBar: MatSnackBar) {

    }

    public inGame: boolean = false;

    public emojiState: string = '';

    public gameId: string;

    public card: Card;
    public cardState: CardState;
    public points: number = 0;
    public selectedHints: number[] = [];

    public synIndex: number = 0;
    public antIndex: number = 0;
    public genIndex: number = 0;
    public exIndex: number = 0;

    game: Observable<any>;

    public joinGame() {
        if(!this.gameId) return;
        this.game = this.db.object('games/' + this.gameId).valueChanges();
        this.game.takeUntil(componentDestroyed(this)).subscribe(ob => {
            if (ob) {

                this.card = ob.card;

                this.cardState = ob.cardState;

                this.synIndex = this.cardState.synIndex;
                this.antIndex = this.cardState.antIndex;
                this.genIndex = this.cardState.genIndex;
                this.exIndex = this.cardState.exIndex;

                this.points = ob.points;
                this.emojiState = ob.emojiState;
                console.log(this.emojiState);
                //setTimeout(()=>{ this.emojiState='';},5000);
                setTimeout(()=>{ this.db.object('games/' + this.gameId).update({
                    emojiState: ''
                });
                },5000);

                console.log(this.emojiState);
                if(ob.selectedHints)
                {
                    this.selectedHints = ob.selectedHints;
                } else {
                    this.selectedHints = [];
                }

                this.inGame = true;


            } else {
                this.card = null;
                this.points = null;
                this.selectedHints = null;
                this.gameId = null;
                this.snackBar.open("Error joining game, try again!", null, {
                    duration: 2000,
                });
            }

        });
    }


    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
