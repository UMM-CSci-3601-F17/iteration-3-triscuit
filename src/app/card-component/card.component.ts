import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card/card";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

    constructor() {
    }

    @Input() card: Card;

    @Input() synIndex: number;
    @Input() antIndex: number;
    @Input() genIndex: number;
    @Input() exIndex: number;

    @Input() selected?: number[] = [];

    @Input() hideSelected?: boolean = false;

    ngOnInit() {
    }

}
