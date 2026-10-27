// membulatkan angka
const fmt = (n) => Number(n.toFixed(2));

// segitiga
function hitungSegitiga(sisi) {
  const luas = (Math.sqrt(3) / 4) * sisi ** 2;
  const keliling = 3 * sisi;

  console.group("1. SEGITIGA)");
  console.log(`   Sisi      : ${sisi}`);
  console.log(`   Luas      : ${fmt(luas)}`);
  console.log(`   Keliling  : ${fmt(keliling)}`);
  console.groupEnd();

  return { Bangun: "Segitiga", Luas: fmt(luas), Keliling: fmt(keliling), Volume: "-" };
}

// persegi 
function hitungPersegiPanjang(panjang, lebar) {
  const luas = panjang * lebar;
  const keliling = 2 * (panjang + lebar);

  console.group("2. PERSEGI PANJANG");
  console.log(`   Panjang   : ${panjang}`);
  console.log(`   Lebar     : ${lebar}`);
  console.log(`   Luas      : ${fmt(luas)}`);
  console.log(`   Keliling  : ${fmt(keliling)}`);
  console.groupEnd();

  return { Bangun: "Persegi Panjang", Luas: fmt(luas), Keliling: fmt(keliling), Volume: "-" };
}

// prisma
function hitungPrismaSegitiga(a, b, c, tinggiPrisma) {
  // Alas berupa segitiga sembarang
  const kelilingAlas = a + b + c;
  const s = kelilingAlas / 2;
  const luasAlas = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  const luasPermukaan = 2 * luasAlas + kelilingAlas * tinggiPrisma;
  const volume = luasAlas * tinggiPrisma;
  const totalRusuk = 2 * kelilingAlas + 3 * tinggiPrisma; // "keliling" = total panjang rusuk

  console.group("3. PRISMA SEGITIGA");
  console.log(`   Rusuk alas (a,b,c) : ${a}, ${b}, ${c}`);
  console.log(`   Tinggi prisma      : ${tinggiPrisma}`);
  console.log(`   Luas alas          : ${fmt(luasAlas)}`);
  console.log(`   Luas permukaan     : ${fmt(luasPermukaan)}`);
  console.log(`   Volume             : ${fmt(volume)}`);
  console.log(`   Total panjang rusuk: ${fmt(totalRusuk)}`);
  console.groupEnd();

  return { Bangun: "Prisma Segitiga", Luas: fmt(luasPermukaan), Keliling: fmt(totalRusuk), Volume: fmt(volume) };
}

// limas
function hitungLimasPersegi(sisi, tinggiLimas) {
  const luasAlas = sisi ** 2;

  // Tinggi sisi tegak
  const tinggiSisiTegak = Math.sqrt(tinggiLimas ** 2 + (sisi / 2) ** 2);
  const luasSisiTegak = 4 * (0.5 * sisi * tinggiSisiTegak);

  const luasPermukaan = luasAlas + luasSisiTegak;
  const volume = (1 / 3) * luasAlas * tinggiLimas;

  // Panjang rusuk tegak
  const rusukTegak = Math.sqrt(tinggiLimas ** 2 + (sisi * Math.SQRT2 / 2) ** 2);
  const totalRusuk = 4 * sisi + 4 * rusukTegak; // "keliling" = total panjang rusuk

  console.group("4. LIMAS PERSEGI");
  console.log(`   Sisi alas        : ${sisi}`);
  console.log(`   Tinggi limas     : ${tinggiLimas}`);
  console.log(`   Luas alas        : ${fmt(luasAlas)}`);
  console.log(`   Tinggi sisi tegak: ${fmt(tinggiSisiTegak)}`);
  console.log(`   Luas permukaan   : ${fmt(luasPermukaan)}`);
  console.log(`   Volume           : ${fmt(volume)}`);
  console.log(`   Total panjang rusuk: ${fmt(totalRusuk)}`);
  console.groupEnd();

  return { Bangun: "Limas Persegi", Luas: fmt(luasPermukaan), Keliling: fmt(totalRusuk), Volume: fmt(volume) };
}

// segitiga sembarang
function hitungSegitigaSembarang(a, b, c) {
  const keliling = a + b + c;
  const s = keliling / 2;
  const luas = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  console.group("5. SEGITIGA SEMBARANG");
  console.log(`   Sisi a    : ${a}`);
  console.log(`   Sisi b    : ${b}`);
  console.log(`   Sisi c    : ${c}`);
  console.log(`   Luas      : ${fmt(luas)}`);
  console.log(`   Keliling  : ${fmt(keliling)}`);
  console.groupEnd();

  return { Bangun: "Segitiga Sembarang", Luas: fmt(luas), Keliling: fmt(keliling), Volume: "-" };
}

// Hasil
function main() {
  console.clear();
  console.log("   KALKULATOR BANGUN DATAR & BANGUN RUANG");

  const hasil = [
    hitungSegitiga(6),                       
    hitungPersegiPanjang(10, 5),             
    hitungPrismaSegitiga(3, 4, 5, 10),       
    hitungLimasPersegi(6, 4),                
    hitungSegitigaSembarang(7, 8, 9)         
  ];
}

// untuk Jalankan
main();