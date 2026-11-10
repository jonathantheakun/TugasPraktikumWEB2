const produk1 = { id: 1, nama: "Kopi Hitam", harga: 15000, stok: 5 };
const produk3 = { id: 3, nama: "Roti Bakar", harga: 20000, stok: 3 };
const produk4 = { id: 4, nama: "Susu UHT", harga: 12000, stok: 0 }; // Stok habis untuk tes alert
const produk5 = { id: 5, nama: "Air Mineral", harga: 5000, stok: 10 };


const produk2 = new Object();
produk2.id = 2;
produk2.nama = "Teh Celup";
produk2.harga = 8000;
produk2.stok = 8;


const daftarProduk = [produk1, produk2, produk3, produk4, produk5];


let keranjang = [];


const containerProduk = document.getElementById("daftar-produk"); // getElementById
const infoKeranjang = document.querySelector(".info-keranjang"); // querySelector
const listKeranjang = document.getElementById("list-keranjang");
const btnCheckout = document.getElementById("btn-checkout");
const btnHapusTerakhir = document.getElementById("btn-hapus-terakhir");
const HasilPesanan = document.getElementById("Hasil-pesanan");


function tampilkanProduk() {
    containerProduk.innerHTML = ""; 

    for (let i = 0; i < daftarProduk.length; i++) {
        const produk = daftarProduk[i];

        
        const card = document.createElement("div");
        card.className = "card-produk"; 

        
        const judul = document.createElement("h3");
        judul.appendChild(document.createTextNode(produk.nama));

        const harga = document.createElement("p");
        harga.appendChild(document.createTextNode(`Harga: Rp ${produk.harga}`));

        const stok = document.createElement("p");
        stok.appendChild(document.createTextNode(`Stok: ${produk.stok}`));

        const btnTambah = document.createElement("button");
        btnTambah.className = "btn-tambah";
        btnTambah.appendChild(document.createTextNode("Tambah ke Keranjang"));
        
        
        btnTambah.onclick = () => tambahKeKeranjang(produk.id);

        
        card.appendChild(judul);
        card.appendChild(harga);
        card.appendChild(stok);
        card.appendChild(btnTambah);

        
        if (produk.stok === 0) {
            card.style.backgroundColor = "#ffcccc"; // CamelCase 1
            card.style.color = "#990000";           // CamelCase 2
            btnTambah.disabled = true;
            btnTambah.innerText = "Stok Habis";
        }

        containerProduk.appendChild(card);
    }
}


function tambahKeKeranjang(idProduk) {
    // Cari produk berdasarkan ID
    let produkDitemukan = null;
    for (let i = 0; i < daftarProduk.length; i++) {
        if (daftarProduk[i].id === idProduk) {
            produkDitemukan = daftarProduk[i];
            break;
        }
    }

    
    if (produkDitemukan.stok === 0) {
        alert("Maaf, stok produk ini sedang habis!");
        return;
    }

    
    keranjang.push(produkDitemukan);
    
   
    produkDitemukan.stok--;

    
    tampilkanProduk();
    tampilkanKeranjang();
}


function tampilkanKeranjang() {
    listKeranjang.innerHTML = ""; 
    
    
    for (let i = 0; i < keranjang.length; i++) {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(`${keranjang[i].nama} - Rp ${keranjang[i].harga}`));

        const btnHapus = document.createElement("button");
        btnHapus.className = "btn-hapus-item";
        btnHapus.innerText = "Hapus";
        
        btnHapus.onclick = () => {
            if (confirm(`Yakin ingin menghapus ${keranjang[i].nama} dari keranjang?`)) {
                // Kembalikan stok produk
                for (let j = 0; j < daftarProduk.length; j++) {
                    if (daftarProduk[j].id === keranjang[i].id) {
                        daftarProduk[j].stok++;
                        break;
                    }
                }
                
                
                keranjang.splice(i, 1);
                
                
                listKeranjang.removeChild(li);
                
                
                tampilkanProduk();
                tampilkanKeranjang();
            }
        };

        li.appendChild(btnHapus);
        listKeranjang.appendChild(li);
    }

   
    let totalHarga = 0;
    for (let i = 0; i < keranjang.length; i++) {
        totalHarga += keranjang[i].harga;
    }

    infoKeranjang.innerHTML = `Jumlah Item: ${keranjang.length} <br> Total Harga: Rp ${totalHarga}`;
    
    
    if (keranjang.length === 0) {
        btnHapusTerakhir.disabled = true;
    } else {
        btnHapusTerakhir.disabled = false;
    }
}



btnHapusTerakhir.onclick = () => {
    if (keranjang.length > 0) {
        if (confirm("Yakin ingin membatalkan item terakhir?")) {
            
            const itemDibuang = keranjang.pop();
            
            
            for (let j = 0; j < daftarProduk.length; j++) {
                if (daftarProduk[j].id === itemDibuang.id) {
                    daftarProduk[j].stok++;
                    break;
                }
            }
            
            tampilkanProduk();
            tampilkanKeranjang();
        }
    }
};


btnCheckout.onclick = () => {
    if (keranjang.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }

    
    const namaPembeli = prompt("Masukkan nama pembeli:");
    
    if (namaPembeli) {
        let totalHarga = 0;
        let daftarItemString = []; 

        for (let i = 0; i < keranjang.length; i++) {
            totalHarga += keranjang[i].harga;
            daftarItemString.push(keranjang[i].nama);
        }

        
        const itemDigabung = daftarItemString.join(", ");

        
        HasilPesanan.innerHTML = `
            <strong>Hasil Pesanan:</strong><br>
            Nama Pembeli: ${namaPembeli}<br>
            Daftar Item: ${itemDigabung}<br>
            Total Harga: Rp ${totalHarga}<br>
            <em>Terima kasih telah berbelanja!</em>
        `;

        
        keranjang = [];
        tampilkanKeranjang();
        alert("Checkout berhasil! Silakan lihat ringkasan di halaman.");
    } else {
        alert("Checkout dibatalkan. Nama pembeli harus diisi.");
    }
};


tampilkanProduk();
tampilkanKeranjang();