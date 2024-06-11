
// Wrapper class
class WordUtils {
    
    constructor() {
        this.baseURL = 'https://api.datamuse.com/words?';
        
        this.paramCount = 0;
        this.firstEndpoint = '';

        this.endpoint = '';
        this.spEndpoint = '';
        this.metaLetters = '';
        this.metaEndpoint = '';

        this.startsWithToggled = 0;
        this.endsWithToggled = 0;
        this.spelledLikeToggled = 0;

        this.metadata = {d: {toggle: 0, string: "d"}, p: {toggle: 0, string: "p"}, s: {toggle: 0, string: "s"}, r: {toggle: 0, string: "r"}, f: {toggle: 0, string: "f"}};
    }

    //////////////////////////////////////////////////////

    // Standard methods
    similarMeaning(word) {

        let addOn = `&ml=${word}`;
        let currentEndpoint = this.endpoint;
    
        
        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }

        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    soundsLike(word) {

        let addOn = `&sl=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    // Note, this one requires some knowledge of the API (using * as wildcard characters and the ? as a single character)
    spelledLike(word) {

        if(this.startsWithToggled || this.endsWithToggled) {
            throw new Error("You can not use spelledLike in conjunction with startsWith or endsWith. Please use this method alone, or a combination of the other methods.");
        }

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }

        let addOn = `&sp=${word}`;
        let currentEndpoint = this.endpoint;
    
        this.endpoint = currentEndpoint += addOn;
        this.spelledLikeToggled = 1;
        this.paramCount++;
        return this;
    }

    startsWith(word) {

        if(this.spelledLikeToggled === 1) {
            throw new Error("You can not use startsWith or endsWith in conjunction with spelledLike. Please use spelledLike by itself.");
        }

        if(this.paramCount === 0) {
            this.firstEndpoint = "sp";
        }

        let addOn = '';
        let currentEndpoint = this.spEndpoint;

        if(this.endsWithToggled) {
            const index = currentEndpoint.indexOf("=");
            addOn = currentEndpoint.slice(0,index+1) + `${word}*` + currentEndpoint.slice(index+1);
            console.log("Add on is: ", addOn);
        }
        else {
            addOn = `&sp=${word}*`;
        }
        this.spEndpoint = addOn;
        this.startsWithToggled = 1;
        this.paramCount++;
        return this;
    }

    endsWith(word) {

        if(this.spelledLikeToggled === 1) {
            throw new Error("You can not use startsWith or endsWith in conjunction with spelledLike. Please use spelledLike by itself.");
        }

        if(this.paramCount === 0) {
            this.firstEndpoint = "sp";
        }

        let addOn = '';
        let currentEndpoint = this.spEndpoint;

        if(this.startsWithToggled) {
            addOn = `*${word}`;
        }
        else {
            addOn = `&sp=*${word}`;
        }
        this.spEndpoint = currentEndpoint + addOn;
        this.endsWithToggled = 1;
        this.paramCount++;
        return this;
    }

    startEndBetween(start, end, betweenCount,) {

        if(typeof(start) != "string" || typeof(end) != "string" || typeof(betweenCount) != "number") {
            throw new Error("Start and end must both be strings, and betweenCount must be a number.");
        }

        if(this.paramCount === 0) {
            this.firstEndpoint = "sp";
        }

        let questionMarks = '';
        for(let i=0; i<betweenCount; i++) {
            questionMarks += "?";
        }

        let addOn = `&sp=${start}${questionMarks}${end}`;
        
        this.spEndpoint = addOn;
        this.paramCount++;
        return this;

    }

    // This function does NOT work by itself. It merely narrows results of other functions. It will return an empty JSON if called by itself.
    topic(category) {

        let addOn = '';
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }

        addOn = `&topic=${category}`;
        
        this.endpoint = currentEndpoint + addOn;
        this.paramCount++;
        return this;

    }

    // Will not work by itself.
    numResults(count=100) {
        
        if(count > 1000) {
            throw new Error("Count may not exceed 1000. Please try again")
        }
        let addOn = '';
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }

        addOn = `&max=${count}`;
        
        this.endpoint = currentEndpoint + addOn;
        this.paramCount++;
        return this;
    }

    //////////////////////////////////////////////////////

    // Rel methods

    adjectives(word) {
        let addOn = `&rel_jjb=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    wordsModifiedByAdjective(adjective) {
        let addOn = `&rel_jja=${adjective}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    synonyms(word) {
        let addOn = `&rel_syn=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    antonyms(word) {
        let addOn = `&rel_ant=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    homophones(word) {
        let addOn = `&rel_hom=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    hyponyms(word) {
        let addOn = `&rel_gen=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    hypernyms(word) {
        let addOn = `&rel_spc=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }

    triggers(word) {
        let addOn = `&rel_trg=${word}`;
        let currentEndpoint = this.endpoint;

        if(this.paramCount === 0) {
            this.firstEndpoint = "endpoint";
        }
    
        this.endpoint = currentEndpoint += addOn;
        this.paramCount++;
        return this;
    }


    //////////////////////////////////////////////////////

    // Metadata methods

    allMetadata() {


        for(let key in this.metadata) {
            let element = this.metadata[key];
            if(element.toggle !=1) {
                this.metaLetters += element.string;
            }
        }

        // Toggle everything
        for(let key in this.metadata) {
            let element = this.metadata[key];
            element.toggle=1;
        }
        
        if(this.paramCount === 0) {
            this.firstEndpoint = "metaLetters";
        }

        this.paramCount++;
        
        return this;
    }

    definitions() {

        if(this.metaLetters.indexOf("d") != -1) {
            return this;
        }
        if(this.paramCount === 0) {
            this.firstEndpoint = "metaLetters";
        }
        this.metaLetters += "d";
        this.paramCount++;
        this.metadata.d.toggle = 1;
        return this;
    }

    partsOfSpeech() {
        if(this.metaLetters.indexOf("p") != -1) {
            return this;
        }
        if(this.paramCount === 0) {
            this.firstEndpoint = "metaLetters";
        }
        this.metaLetters += "p";
        this.paramCount++;
        this.metadata.p.toggle = 1;
        return this;   
    }

    syllableCount() {
        if(this.metaLetters.indexOf("s") != -1) {
            return this;
        }
        if(this.paramCount === 0) {
            this.firstEndpoint = "metaLetters";
        }
        this.metaLetters += "s";
        this.paramCount++;
        this.metadata.s.toggle = 1;
        return this;       
    }

    pronunciation() {
        if(this.metaLetters.indexOf("r") != -1) {
            return this;
        }
        if(this.paramCount === 0) {
            this.firstEndpoint = "metaLetters";
        }
        this.metaLetters += "r";
        this.paramCount++;
        this.metadata.r.toggle = 1;
        return this;
    }

    //////////////////////////////////////////////////////

    // Fetch methods

    async fetch() {
        
        let fetchURL = '';

        if(this.metaLetters != "") {
            this.metaEndpoint = "&md=" + this.metaLetters;
        }
    
        if(this.firstEndpoint === "endpoint") {
            this.endpoint = this.endpoint.slice(1);
            fetchURL =  this.baseURL + this.endpoint + this.spEndpoint + this.metaEndpoint;
        }
        else if(this.firstEndpoint === "sp") {
            this.spEndpoint = this.spEndpoint.slice(1);
            fetchURL = this.baseURL + this.spEndpoint + this.endpoint + this.metaEndpoint;
        }
        else if(this.firstEndpoint === "metaLetters") {
            this.metaEndpoint = this.metaEndpoint.slice(1);
            fetchURL = this.baseURL + this.metaEndpoint + this.endpoint + this.spEndpoint;
        }
        else {
            console.log("First endpoint not found.");
        }

        // console.log("Fetching: ", fetchURL);
        const request = await fetch(fetchURL);
        const response = await request.json();
        // console.log(response);

        // Clear
        this.endpoint = '';
        this.paramCount = 0;
        this.spEndpoint = '';
        this.metaEndpoint = '';
        this.metaLetters = '';
        this.startsWithToggled = 0;
        this.endsWithToggled = 0;
        this.spelledLikeToggled = 0;
        for(let key in this.metadata) {
            let element = this.metadata[key];
            element.toggle=0;
        }
        return response;
    
    }

    async printFetch() {

        let fetchURL = '';
        if(this.metaLetters != "") {
            this.metaEndpoint = "&md=" + this.metaLetters;
        }
        
        if(this.firstEndpoint === "endpoint") {
            this.endpoint = this.endpoint.slice(1);
            fetchURL =  this.baseURL + this.endpoint + this.spEndpoint + this.metaEndpoint;
        }
        else if(this.firstEndpoint === "sp") {
            this.spEndpoint = this.spEndpoint.slice(1);
            fetchURL = this.baseURL + this.spEndpoint + this.endpoint + this.metaEndpoint;
        }
        else if(this.firstEndpoint === "metaLetters") {
            this.metaEndpoint = this.metaEndpoint.slice(1);
            fetchURL = this.baseURL + this.metaEndpoint + this.endpoint + this.spEndpoint;
        }
        else {
            console.log("First endpoint not found.");
        }

        // console.log("Fetching: ", fetchURL);
        const request = await fetch(fetchURL);
        const response = await request.json();
        console.log(response);

        // Clear
        this.endpoint = '';
        this.paramCount = 0;
        this.spEndpoint = '';
        this.metaEndpoint = '';
        this.metaLetters = '';
        this.startsWithToggled = 0;
        this.endsWithToggled = 0;
        this.spelledLikeToggled = 0;
        for(let key in this.metadata) {
            let element = this.metadata[key];
            element.toggle=0;
        }
    }

}

export default WordUtils;




