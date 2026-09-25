// Faktöriyel Hesaplama
let sayi=Number(prompt("Lütfen bir sayı giriniz"));
let fack=1;
if(sayi<0){
    console.log("Lütfen pozitif bir sayı giriniz");
}else{
    for(let i=1;i<=sayi;i++){
        fack=fack*i;
    }
}
console.log("Faktöriyel :"+ fack);