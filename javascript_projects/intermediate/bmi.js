// BMI Hesaplama
let kilo=Number(prompt("Lütfen kilonuzu giriniz(Kg cinsinden): "));
let boy=Number(prompt("Lütfen boy uzunluğunuzu giriniz(M cinsinden): "));
let sonuc=(kilo/(boy**2))
if (sonuc < 18.5) {
  console.log("İdeal kilonun altında: "+ sonuc);
} else if (sonuc >= 18.5 && sonuc <= 24.9) {
  console.log("İdeal kiloda: "+ sonuc);
} else if (sonuc >= 25 && sonuc <= 29.9) {
  console.log("İdeal kilonun üstünde: "+ sonuc);
} else if (sonuc >= 30 && sonuc <= 39.9) {
  console.log("Obez: "+ sonuc);
} else if (sonuc >= 40) {
  console.log("Morbid obez: "+ sonuc);
}