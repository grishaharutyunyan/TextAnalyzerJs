const fs = require('fs');
const input = 'example.txt';
const output = 'result.txt';

fs.readFile(input, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let res = textAnalize(data);

  const resData= `Words: ${res.words},\nLetters: ${res.letters},\nSentences: ${res.sentences},\nRepeated Letters: ${res.repeatedLetters},\nWord Frequency: ${JSON.stringify(res.wordFrequency, null, 2)}`;

  fs.writeFile(output, resData, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('result written to result.txt');
  });

  function textAnalize(text) {
    let wordCount = 0;
    let letterCount = 0;
    let sentenceCount = 0;
    let repeatedLetters = [];
    let wordFrequency = {};

    let inWord = false;
    for (let i = 0; i < text.length; i++) {
      let char = text[i];

      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        letterCount++;
        inWord = true;
      } else {
        if (inWord) {
          wordCount++;
          inWord = false;
        }
      }

      if (char === '.' || char === '!' || char === '?') {
        sentenceCount++;
      }
    }

    if (inWord) {
      wordCount++;
    }

    let isLetter = {};
    for (let i = 0; i < text.length; i++) {
      let char = text[i].toLowerCase();
      if (char >= 'a' && char <= 'z') {
        isLetter[char] = (isLetter[char] || 0) + 1;
      }
    }

    for (let letter in isLetter) {
      if (isLetter.hasOwnProperty(letter) && isLetter[letter] > 3) {
        repeatedLetters.push(letter);
      }
    }

    let words = text.split(/\s+/); 
    for (let word of words) {
      if (word) {
        let isWord = word.toLowerCase();
        wordFrequency[isWord] = (wordFrequency[isWord] || 0) + 1;
      }
    }

    return {
      words: wordCount,
      letters: letterCount,
      sentences: sentenceCount,
      repeatedLetters,
      wordFrequency,
    };
  }
});
