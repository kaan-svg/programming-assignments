// TYT Puan Hesaplama
let turkceDogru = Number(prompt("Türkçe doğru sayısı"));
let turkceYanlis = Number(prompt("Türkçe yanlış sayısı"));
let matematikDogru = Number(prompt("Matematik doğru sayısı"));
let matematikYanlis = Number(prompt("Matematik yanlış sayısı"));
let sosyalDogru = Number(prompt("Sosyal doğru sayısı"));
let sosyalYanlis = Number(prompt("Sosyal yanlış sayısı"));
let fenDogru = Number(prompt("Fen doğru sayısı"));
let fenYanlis = Number(prompt("Fen yanlış sayısı"));
let okulPuani = Number(prompt("Okul puanınızı giriniz"));
let dogruSayisi = turkceDogru+matematikDogru+sosyalDogru+fenDogru;
let yanlisSayisi = turkceYanlis+matematikYanlis+sosyalYanlis+fenYanlis;
let kalanDogruSayisi = dogruSayisi - (yanlisSayisi/4);
let puan = (kalanDogruSayisi*4) + 100 + okulPuani;
alert("TYT Puanınız : " + puan);