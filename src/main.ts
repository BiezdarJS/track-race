import './style.css';
import { fromEvent, interval, mergeMap, Observable, of, scan, tap } from 'rxjs';

let myArr: Observable<any>[] | undefined = [];

interval(1000)
  .pipe(
    scan((count: number) => count + 1, 0),
    tap((count) => {
      if (count % 3 === 0) {
        myArr.push(of({ letter: 'a', currentTime: 0 }));
      }
    })
  )
  .subscribe({
    next: (data) => {
      console.log(data, myArr);
    },
  });

// Dla pierwszego z listy obecnie istniejących elementów tablicy wykonaj keyboard event
fromEvent<KeyboardEvent>(document, 'keyup')
  .pipe(
    mergeMap(() => myArr),
    mergeMap((item) => item),
    tap((value) => {
      console.log(value.letter);
    })
    // find((event: KeyboardEvent) => {
    //   const currentLetter = myArr[0];
    //   console.log(currentLetter);
    //   return event.key === currentLetter?.innerText;
    // })
  )
  .subscribe((event: KeyboardEvent | undefined) => {
    if (event) {
      console.log(true); // key matches
      // removeLetter(arrA.at(0));
    } else {
      console.log(false); // no match
    }
  });

// function removeLetter(letter: HTMLParagraphElement | null): void {
//   if (letter) {
//     letter.remove();
//   }
// }
