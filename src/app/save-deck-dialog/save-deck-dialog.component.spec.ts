import {DeckService} from "../deck/deck.service";
import {SaveDeckDialogComponent} from "./save-deck-dialog.component";
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DeckId} from "../deck/deck";

describe('SaveCardDialogueComponent', () => {
    let component: SaveDeckDialogComponent;
    let fixture: ComponentFixture<SaveDeckDialogComponent>;
    let deck: DeckId;


    beforeEach(() => {
        deck = {
            id: "test id",
            name: "test word",
            isShared: true,

        };

        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [SaveDeckDialogComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: DeckService},
                {provide: MdDialogRef},
                {provide: MD_DIALOG_DATA, useValue: {deck: deck}},
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


    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SaveDeckDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
