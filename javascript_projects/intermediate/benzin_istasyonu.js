// Benzin İstasyonu Uygulaması
let dizel = 24.53 , benzin =22.25, lpg = 11.1;
const yeniSatir = "\r\n";
const yakitMetni = "1-Dizel"+yeniSatir+"2-Benzin"+yeniSatir+"3-LPG"+yeniSatir+"Yakıt türünüzü seçiniz";
let yakitTipi = prompt(yakitMetni);
if(yakitTipi=="1" || yakitTipi=="2" || yakitTipi=="3"){
    let yakitLitresi = Number(prompt("Yakıt litresini giriniz"));
    let bakiye = Number(prompt("Bakiyenizi giriniz"));
    let fiyat = yakitTipi=="1"? dizel : yakitTipi=="2"? benzin : lpg;
    let odenecekTutar = fiyat*yakitLitresi;
    if(odenecekTutar<=bakiye){
        bakiye -= odenecekTutar;
        alert("Yakıt alma işlemi başarılı"+yeniSatir+"Kalan bakiye : " + bakiye);
    }else{
        alert("Bakiyeniz yetersiz!"+yeniSatir+"Ödenecek tutar : " + odenecekTutar+yeniSatir+"Bakiye : " + bakiye);
    }
}else{
    alert("Lütfen geçerli bir yakıt türü seçiniz!");
}