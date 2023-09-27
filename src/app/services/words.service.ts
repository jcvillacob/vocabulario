import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor() { }

  async loadWords(): Promise<any[]> {
    const url = 'assets/words.xlsx';
    const resp = await fetch(url);
    const blob = await resp.blob();
    const workbook = XLSX.read(await blob.arrayBuffer(), {type: 'array'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    const filteredData = data.filter((row: any) => row['Item type'] === 'Word');
    return this.formatData(this.getRandom(filteredData, 20));
  }

  private formatData(data: any[]): any[] {
    const formattedData = data.map(row => {
      const wordDefinition = row['Word definition'];
      const commaPosition = wordDefinition.indexOf(',');
      const palabra = commaPosition !== -1 ? wordDefinition.slice(0, commaPosition) : wordDefinition;
      return {
        Subtitle: row['Subtitle'],
        Translation: row['Translation'],
        Word: row['Word'],
        Lemma: row['Lemma'],
        PartOfSpeech: row['Part of speech'],
        WordDefinition: wordDefinition,
        Palabra: palabra  // Nueva propiedad
      };
    });
    return formattedData;
  }

  private getRandom(arr: any[], n: number): any[] {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
}