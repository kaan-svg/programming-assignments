// Asal Sayı Bulma
let sayi=Number(prompt("Lütfen bir sayı giriniz"));
let sonuc=true;
for(let i=2;i<=Math.floor(sayi/2);i++){
    if(sayi%i==0){
        sonuc=false;
        break;
    }
}
if(sonuc){
    console.log(sayi+" asaldır");
}else{
    console.log(sayi+" asal değildir");
}