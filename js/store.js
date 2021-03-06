'use strict';

var timer;

const STATS = {
  gameRules: "Your task is to hunt for each of the superhero-related items within the one-hour time limit. You will be given several multi-layered clues. Each clue will lead you to the next clue. Try to find all of the items before the time runs out!",
  timer: false,
  hour: 1,
  minute: 0,
  second: 0,
  questionNumber: 1,
  numberCorrect: 0,
  numberWrong: 0,
};

const QSTORE = [
  {
    question: "Which hero am I?",
    choices: ["Batman", "Hellboy", "Deadpool", "Red Tornado"],
    answer: "Hellboy",
    feedback: "Hellboy is a hero created by writer-artist Mike Mignola. His fascination with ghosts and monsters began at an early age, reading Dracula at age 12 introduced him to Victorian literature and folklore, from which he has never recovered. This clearly had a heavy influence on the creation of Hellboy. In August 1993, Mignola debuted the first appearance of Hellboy in San Diego Comic-Con #2 published by Dark Horse Comics.",
  },

  {
    question: "Which movie am I?",
    choices: ["Deadpool", "Hellboy", "The Amazing Spider-Man", "Hellboy II: The Golden Army"],
    answer: "Hellboy",
    feedback: "Hellboy a 2004 hero movie was director Guillermo del Toro's dream project but could never secure a budget or studio approval. After the massive success of Blade II (2002), del Toro was offered Blade: Trinity (2004) or Hellboy. He chose Hellboy. In the film, a demonic beast-turned hero known as Hellboy, secretly works to keep the world safe from paranormal threats with his team, the Bureau of Paranormal Research and Defense. In the comics, the B.P.R.D. initially had strong links to the United States Army Air Forces and was based at a military airbase in New York. By 1948, the Bureau relocated to a custom built facility in Fairfield, Connecticut then for the film eventually ended up in an abandoned research facility in Colorado New Jersey.",
  },

  {
    question: "Which location am I?",
    choices: ["National Technical Museum", "Cal Poly Pomona Classroom, Laboratory & Administration Building", "Bradbury Building", "National Memorial on the Vitkov Hill"],
    answer: "National Memorial on the Vitkov Hill",
    feedback: "This scene in the 2004 Hellboy movie was taken at National Monument at Vítkov Hill in Prague. The massive building of National Monument that was built in the years 1927–1932 in honour of Czech legionary and foundation of the former Czechoslovakia. The Bureau for Paranormal Research and Defence, where Hellboy resided in a more or less voluntary prison, was nothing else but the National Monument in Vítkov. For Guillermo del Toro and Ron Perlman, the actor of Hellboy, Prague had already been an old acquaintance. Not long before that they filmed Blade II, and it was perhaps the reason why the director managed to cast Perlman before Vin Diesel, who was the studio's original choice.",
  },
];

const STORE = [
  "In comic books, I am a creature that was summoned to Earth by Nazi cultist Grigori Rasputin. My real name is Anung Un Rama and I was destined to destroy the world by unleashing the Ogdru Jahad to spread darkness and chaos across existence. I have superhuman abilities that stem from my demonic heritage, but I am also the Earth's first line of defense against occult menaces. I am a large, red-skinned demon with a tail, horns, which I filed off, leaving behind the signature circular stumps on my forehead, and an over-sized right hand made of stone. I am a hero. Who am I?",
  "In the 2004 movie adaptation of the comic book hero described in Clue # 1, at the end of World War II, the Nazis attempt to open a portal to a paranormal dimension in order to defeat the Allies, but are only able to summon a baby demon who is rescued by Allied forces. Sixty years later, the Bureau of Paranormal Research and Defense protects America against dark forces the likes of Rasputin and Kroenen. This movie released on April 2nd with the same title as the hero also known in the film as Big Red played by actor Ron Perlman was directed by Guillermo del Toro. What movie am I?",
  "From Clue # 2 we found that the 2004 Hellboy movie featured the main cast from the comic books even the facility for the Bureau of Paranormal Research and Defense was featured. The location and buliding that acted as the B.P.R.D. facility shown below is not a set but an actual real-life location. It is a National Monument located in Prague of the Czech Republic. What am I?",
];

const API_COMICS = {
  url: "https://comicvine.gamespot.com/api/search/?api_key=",
  key: "07ce68f63281224c6c07468a43c3f3947c29060f",
  limit: "&limit=5",
  format: "&format=jsonp",
  callback: "&json_callback=returnResponse",
  query: "&query=",
  surl: function() {
    return this.url + this.key + this.limit + this.format + this.callback + this.query;
  },
};

const API_MOVIES = {
  url: "https://comicvine.gamespot.com/api/movies/?api_key=",
  key: "07ce68f63281224c6c07468a43c3f3947c29060f",
  limit: "&limit=5",
  format: "&format=jsonp",
  callback: "&json_callback=returnResponse",
  query: "&filter=name:",
  surl: function() {
    return this.url + this.key + this.limit + this.format + this.callback + this.query;
  },
};

const API_MAPS = {
  url: "https://api.foursquare.com/v2/venues/search?",
  clientid: "&client_id=K1JMJPEZORIQFY4UIFXHQTHV0DQSQZPH043PCDXBWGOMWVFY",
  clientsecret: "&client_secret=FOK30KASU3C3FL011EXJCMQEHXLCNTT2EANEKJXXYGBHMR2R",
  callback: "&json_callback=returnResponse",
  limit: "&limit=5",
  version: "&v=20181024",
  near: "&near=prague",
  query: "&query=",
  surl: function() {
    return this.url + this.clientid + this.clientsecret + this.callback + this.limit + this.version + this.near + this.query;
  },
};

const ISTORE = {
  img0: "https://yesfitness.com.ua/wp-content/uploads/2016/03/placeholder-1000x600.jpg",
  img1: "https://www.likealocalguide.com/media/cache/0f/0a/0f0a0c32fd7c4fb5e9dffc25a99e9f98.jpg",
  img2: "https://media-cdn.tripadvisor.com/media/photo-s/03/c4/20/92/vitkov-national-monument.jpg",
  img3: "https://www.prague.eu/object/767/pk-2.jpg",
  img4: "https://media-cdn.tripadvisor.com/media/photo-s/01/59/b8/a0/national-marionette-theatre.jpg",
  img5: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/N%C3%A1rodn%C3%AD_muzeum_%28National_Museum%29.jpg/1200px-N%C3%A1rodn%C3%AD_muzeum_%28National_Museum%29.jpg",
  img6: "https://upload.wikimedia.org/wikipedia/commons/2/21/Pomn%C3%ADk_Mistra_Jana_Husa.JPG",
  img7: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Stavovsk%C3%A9_divadlo_vstup_1.jpg/1200px-Stavovsk%C3%A9_divadlo_vstup_1.jpg",
};