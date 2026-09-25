// ATM Uygulaması
let yeniSatir = "\r\n";
let bakiye = 1000;
let metin = "1-Bakiye Görüntüleme " + yeniSatir+ "2-Para Çekme" + yeniSatir+ "3-Para Yatırma" + yeniSatir+ "4-Çıkış";
let secim = prompt(metin);
switch (secim) {
    case "1":
        alert("Bakiyeniz : " + bakiye);
        break;
    case "2":
        let cekilecekTutar = Number(prompt("Çekmek istediğiniz tutarı giriniz :"));
        if (cekilecekTutar <= bakiye) {
            bakiye -= cekilecekTutar;
            alert("Kalan bakiye : " + bakiye);
        } else {
            alert("Bakiyenizden fazla para çekemezsiniz!");
        }
        break;
    case "3":
        let yatirilacakTutar = Number(prompt("Yatırılacak tutarı giriniz :"));
        bakiye += yatirilacakTutar;
        alert("Güncel bakiyeniz : " + bakiye);
        break;
    case "4":
        alert("Çıkış yapıldı...");
        break;
    default:
        alert("Geçersiz seçim!");
        break;
}