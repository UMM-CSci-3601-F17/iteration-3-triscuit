import {DeckService} from "../deck/deck.service";
import {CardPopDialogComponent} from "./card-pop-dialog.component";
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CardId} from "../card/card";

describe('SaveCardDialogueComponent', () => {
    let component: CardPopDialogComponent;
    let fixture: ComponentFixture<CardPopDialogComponent>;
    let card: CardId;


    beforeEach(() => {
        card = {
            id: "test id",
            word: "test word",
            synonym: ["test synonym"],
            antonym: ["test antonym"],
            general_sense: ["test general_sense"],
            example_usage: ["test example_usage"],
        };

        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [CardPopDialogComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService},
                {provide: MdDialogRef},
                {provide: MD_DIALOG_DATA, useValue: {card: card}},
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: Observable.of({id: "test id"}, {id: "test id"})
                    },

                }

            ]
        })
            .compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(CardPopDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
