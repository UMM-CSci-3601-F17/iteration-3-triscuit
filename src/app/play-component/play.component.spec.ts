import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import {Observable} from "rxjs/Observable";
import {Deck} from "../deck/deck";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {DeckService} from "../deck/deck.service";
import {ActivatedRoute} from "@angular/router";
import {SharedModule} from "../shared.module";
import {CardComponent} from "../card-component/card.component";
import {CardState} from "./CardState";
import {Card} from "../card/card";
import {AppTestModule} from "../app.test.module";

describe('PlayComponent', () => {
  let component: PlayComponent;
  let cardState: CardState;
  let fixture: ComponentFixture<PlayComponent>;

    let deckServiceStub: {
        getDeck: (id) => Observable<Deck>,
        getDeckCards: (id) => Observable<Card[]>
    };



  beforeEach(async(() => {

      deckServiceStub = {
          getDeck: (id) => Observable.of({
              name: "test deck"
          }),
          getDeckCards: (id) => Observable.of([
                  {
                      word : "test word",
                      synonym : ["test synonym"],
                      antonym: ["test antonym"],
                      general_sense: ["test general_sense"],
                      example_usage: ["test example_usage"],
                  },

                  {
                      word : "test word",
                      synonym : ["test synonym"],
                      antonym: ["test antonym"],
                      general_sense: ["test general_sense"],
                      example_usage: ["test example_usage"],
                  },

                  {
                      word : "test word",
                      synonym : ["test synonym"],
                      antonym: ["test antonym"],
                      general_sense: ["test general_sense"],
                      example_usage: ["test example_usage"],
                  }
              ])
      };

    TestBed.configureTestingModule({
        imports: [SharedModule, AppTestModule],
      declarations: [ ],
        providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
            {provide: DeckService, useValue: deckServiceStub}, {
                provide: ActivatedRoute,
                useValue: {
                    params: Observable.of({id: "test id"})
                }
            }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add to cardStates array', () => {
      let card_state: CardState;
      card_state = component.getCardState(0);
      expect(component.cardStates[0]).toEqual(card_state);
  });

  it('should increase page number when adding points', () => {
      let card_state1: CardState;
      card_state1 = component.getCardState(0);

      component.addPoints(0);
      expect(component.pageNumber).toEqual(1);
  });

  it('should update emoji state to the correct emoji', () => {
     let emoji: string;
     emoji = 'smile';

     component.updateEmojiState(emoji);
     expect(component.emojiState).toEqual("smile");

  });

    it('should update emoji state 3 times and get the correct emoji at the end', () => {
        let emoji1: string = "smile";
        let emoji2: string = "anger";
        let emoji3: string = "lit";


        component.updateEmojiState(emoji1);
        component.updateEmojiState(emoji2);
        component.updateEmojiState(emoji3);

        expect(component.emojiState).toEqual("lit");

    });

    //it

});
