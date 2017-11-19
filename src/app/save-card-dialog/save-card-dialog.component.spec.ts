import {DeckService} from "../deck/deck.service";
import {SaveCardDialogComponent} from "./save-card-dialog.component";
import {Observable} from "rxjs/Observable";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ActivatedRoute} from "@angular/router";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CardId} from "../card/card";

describe('SaveCardDialogueComponent', () => {
   let component: SaveCardDialogComponent;
   let fixture: ComponentFixture<SaveCardDialogComponent>;
   let card: CardId;


   beforeEach( () => {
       card = {id: "test id",
           word : "test word",
           synonym : ["test synonym"],
           antonym: ["test antonym"],
           general_sense: ["test general_sense"],
           example_usage: ["test example_usage"],};

       TestBed.configureTestingModule( {
          imports: [SharedModule],
          declarations: [SaveCardDialogComponent],
          providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue:true},
              {provide:DeckService},
              {provide:MdDialogRef},
              {provide:MD_DIALOG_DATA, useValue: {card: card, deckId: "test id"}},
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

   beforeEach( () => {
      fixture = TestBed.createComponent(SaveCardDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should fill hint arrays with empty elements until they are length five', () => {
      var arr: string[] = [];
      component.fillHints(arr);
      expect(arr.length).toEqual(5);
   });

    it('should fill hint arrays that already has some elements with empty elements until they are length five', () => {
        var arr: string[] = ['a', 'b', 'c'];
        component.fillHints(arr);
        expect(arr.length).toEqual(5);
    });

    it('should remove any empty elements from an array so that it is not sent to the database with empty array elements', () => {

        var synonyms: string[] = ['a','b','','','c'];
        component.deleteEmptyFields(synonyms);
        expect(synonyms).toEqual(['a','b','c']);
        expect(synonyms.length).toEqual(3);
    });

    it('should fill a hint array with empty fields and then remove those empty fields so that they arent sent to the db', () => {
        var antonyms: string[] = ['test antonym'];
        component.fillHints(antonyms);
        component.deleteEmptyFields(antonyms);
        expect(antonyms).toEqual(['test antonym']);
    });



});

