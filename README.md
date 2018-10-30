# Thinkful_Capstone_API

http://www.omdbapi.com/?s=deadpool&apikey=c4ff435

https://api.foursquare.com/v2/venues/search?&client_id=K1JMJPEZORIQFY4UIFXHQTHV0DQSQZPH043PCDXBWGOMWVFY&client_secret=FOK30KASU3C3FL011EXJCMQEHXLCNTT2EANEKJXXYGBHMR2R&limit=5&v=20181024&near=prague&query=national%20monument%20prague


// Call to Photos api
https://api.foursquare.com/v2/venues/4adcda9cf964a520364d21e3/photos?client_id=K1JMJPEZORIQFY4UIFXHQTHV0DQSQZPH043PCDXBWGOMWVFY&client_secret=FOK30KASU3C3FL011EXJCMQEHXLCNTT2EANEKJXXYGBHMR2R&v=20181030

{
meta: {
code: 200,
requestId: "5bd874ac351e3d16912a60a8"
},
response: {
photos: {
count: 1,
items: [
{
id: "516999e2e4b026a6f96c8fe0",
createdAt: 1365875170,
source: {
name: "Foursquare for iOS",
url: "https://foursquare.com/download/#/iphone"
},
prefix: "https://fastly.4sqi.net/img/general/",
suffix: "/2298178_73h329c-h5iCvK7DNHteIAlx2DgBNiiNSEU6Z70nbuk.jpg",
width: 1920,
height: 1440,
user: {
id: "2298178",
firstName: "Ben",
lastName: "Owen",
gender: "male",
photo: {
prefix: "https://fastly.4sqi.net/img/user/",
suffix: "/OTH32QS31KYGYBK1.jpg"
}
},
checkin: {
id: "516999d2e4b0a2ef21b19052",
createdAt: 1365875154,
type: "checkin",
timeZoneOffset: 120
},
visibility: "public"
}
],
dupesRemoved: 0
}
}
}
