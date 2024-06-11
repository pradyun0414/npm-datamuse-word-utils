# word-utils

Provides many word utilities. Essentially a wrapper of Datamuse API.

## Table of Contents

COMING SOON

## What is it?

word-utils is intended to provide useful functionalities for working with words. Examples include finding words with similar meanings, similar sounding words, related words, similarly spelled words, etc. 
Queries can be further targeted by specifying starting and ending letters along with selecting a topic of interest. Methods are meant to be repeatedly chained, simplifying the process of using the API.

## Important Note

Please note that the package is essentially a wrapper of the Datamuse API, meaning ALL available functions are asynchronous. I only included functionality I believed to be the most essential, and left certain endpoints out of the package. If you wish to
further look into the API for more niche solutions, please visit the [Datamuse API](https://www.datamuse.com/api/).

## Install

The package is ESM only. Install with npm.

```
npm install word-utils
```

## Configure

```javascript
import WordUtils from 'word-utils'
```
## List of Methods

Methods are categorized as basic, rel (related), or md (metadata) based on their stratification on the documentation of the Datamuse API.
* Basic functions are standard utilities.
* Rel functions are used for related word constraints, and modify the rel parameter of the endpoint.
* Md functions do not alter the words being outputted, but append additional lexical information to the existing results.

### Basic methods
***
  
> Results have a meaning related to this string value, which can be any word or sequence of words.
```javascript
similarMeaning(word)
```  
<br/>


> Requires that the results are pronounced similarly to the passed in string of characters. 
```javascript
soundsLike(word)
```
<br/>


> Required that the results are spelled similarly to the passed in string, or that they match the [wildcard pattern](https://onelook.com/thesaurus/#help) recognized by the Datamuse API.
> A pattern can include any combination of alphanumeric characters and the symbols described on the page.
> NOTE: Using this method requires extra work and is not recommended considering the existence of the startsWith, endsWith, and startEndBetween methods.
```javascript
spelledLike(word)
```
<br/>


> Requires that the results start with the passed in string of characters. 
```javascript
startsWith(word)
```
<br/>


> Requires that the results end with the passed in string of characters. 
```javascript
endsWith(word)
```
<br/>


> Requires that the results start and end with the passed in parameters while having a variable number of letters between them. (For example, it could be used to return all words that start with t and k and have 2 letters in between them).
> start and end both expect string inputs, whereas betweenCount expects an integer input.
```javascript
startsWith(start, end, betweenCount)
```
<br/>


> An optional hint to the system about the theme of the document being written. Results will be skewed toward these topics. At most 5 words can be specified. Space or comma delimited.
```javascript
topic(category)
```
<br/>


> Number of results to return, not to exceed 1000. The default is set to 100.
```javascript
numResults(count)
```
<br/>

> After chaining other methods, call the fetch method to return the promise object. A fetch method MUST be called at the end of each request to view or use your results!
```javascript
fetch()
```
<br/>


> After chaining other methods, call the printFetch method to print the JSON given by an endpoint. A fetch method MUST be called at the end of each request to view or use your results!
```javascript
printFetch()
```
<br/>

### Rel methods

***

> Returns adjectives used to modify the passed in noun.
```javascript
adjectives(noun)
```
<br/>


> Returns nouns modified by the passed in adjective.
```javascript
wordsModifiedByAdjective(adjective)
```
<br/>

> Returns synonyms of the input parameter.
```javascript
synonyms(word)
```
<br/>


> Returns antonyms of the input parameter.
```javascript
antonyms(word)
```
<br/>


> Returns homophones of the input parameter.
```javascript
homophones(word)
```
<br/>


> Returns hyponyms of the input parameter. A hyponym is something of more specific meaning than a general or subordinate term. For example, spoon is a hyponym for cutlery. 
```javascript
hyponyms(word)
```
<br/>

> Returns hypernyms of the input parameter. A hypernym is a word of broad meaning that more specific words fall under. For example, boat is a hypernym of gondola. 
```javascript
hypernyms(word)
```
<br/>


> Returns "triggers" (words that are statistically associated with the query word in the same piece of text). For example, an input of cow would produce milking as one possible output.
```javascript
triggers(word)
```
<br/>

### Metadata (md) methods
***

> Appends all associated metadata (definitons, parts of speech, syllable count, and pronunciation).
```javascript
allMetaData()
```
<br/>


> Appends definitions to results. Produced in the defs field of the result object.
```javascript
definitions()
```
<br/>


> Appends parts of speech to results. One or more part-of-speech codes will be added to the tags field of the result object.
> "n" means noun, "v" means verb, "adj" means adjective, "adv" means adverb, and "u" means that the part of speech is none of these or cannot be determined. Multiple entries will be added when the word's part of speech is ambiguous, with the most popular part of speech listed first.
```javascript
partsOfSpeech()
```
<br/>


> Appends syllable count to results. Produced in the numSyllables field of the result object.
```javascript
syllableCount()
```
<br/>


> Appends pronunciation to results. Produced in the tags field of the result object, prefixed by "pron:". This is the Datamuse API's best guess for the pronunciation of the word or phrase. The format of the pronunication is a space-delimited list of Arpabet phoneme codes.
```javascript
pronunciation()
```
<br/>

## How to Use + Examples

Note that the functions are asynchronous due to their nature of utilizing an API. You should await the results to see functionality as expected. Not doing so will result in flawed queries. 
The core principle is that you can chain any of the functions listed above in ANY order and still get the same results in the end.

```javascript
import WordUtils from 'word-utils';
const tester = new WordUtils();

// THIS IS NOT DONE YET. I WILL BE WRITING DETAILED EXPLANATIONS FOR EACH LINE!

tester.similarMeaning("dog").startsWith("w").endsWith("f").soundsLike("woof").numResults(10).printFetch();
tester.soundsLike("worm").topic("temperature").printFetch();
tester.definitions().endsWith("a").similarMeaning("spoon").printFetch();
tester.startEndBetween("w", "f", 2).printFetch();

tester.synonyms("basic").printFetch();
tester.homophones("bare").wordsModifiedByAdjective("grizzly").printFetch();
tester.adjectives("feet").antonyms("clean").printFetch();
tester.hyponyms("cutlery").printFetch();
tester.hypernyms("gondola").printFetch();
tester.triggers("cow").printFetch();

tester.soundsLike("potato").allMetadata().printFetch();
tester.definitions().pronunciation().soundsLike("fighter").printFetch();
```

## License

ISC License

## Credits

A huge thanks to the Datamuse API. Please check it out if you wish to make more detailed queries - this is just a wrapper.
<br/>
Created by Pradyun Bhaskar








