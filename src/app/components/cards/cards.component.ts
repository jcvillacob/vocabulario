import { Component, AfterViewInit, OnInit } from '@angular/core';
import { WordsService } from 'src/app/services/words.service';

// Declaramos Swiper como una variable global
declare var Swiper: any;

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements AfterViewInit, OnInit {
  see: boolean = false;
  words: any[] = [];

  constructor(private wordsService: WordsService) {}

  async ngOnInit(): Promise<void> {
    this.words = await this.wordsService.loadWords();
  }

  ngAfterViewInit() {
    setTimeout (() => {
      /* PRIMER SWIPPER */
      new Swiper('.mySwiper', {
        grabCursor: true,
        effect: 'creative',
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        },
      });
    }, 500);
    
  }

  seeTranslation() {
    this.see = !this.see;
  }
}
