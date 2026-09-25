// Armstrong Sayısı Kontrolü
let sayi=prompt("Lütfen bir sayı giriniz");
let toplam=0;
for(let i=0;i<sayi.length;i++){
    let rakam = Number(sayi.charAt(i));
    toplam+=rakam**sayi.length;
}
if(Number(sayi)==toplam){
    console.log("Armstrong sayı");
}else{
    console.log("Armstrong değil");
}