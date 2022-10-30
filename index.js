const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  // membuat pesan balasan Halo/halo/hai/haii/hi/hey lalu mention ke pengirim pesan yang mengirimkan pesan tersebut dengan @contact.id.user
  if (message.body === "Halo" || message.body === "halo" || message.body === "hai" || message.body === "haii" || message.body === "hi" || message.body === "hey") {
    message.reply(`Halo @${message.from.split("@")[0]}`);
    client.sendMessage(message.from, "Selamat Datang di WhatsApp Bot");
    client.sendMessage(message.from, "Creator and Coding: Almas Najiib Imam M ft. Johanes Setiawan");
    client.sendMessage(message.from, "Silahkan ketik *#menu* untuk melihat menu");
  }
  // membuat daftar menu di whatsapp bot
  if (message.body === "#menu") {
    client.sendMessage(message.from, "Menu : \n #ping \n #pacar \n #ucapan \n #socialmedia \n #uptime \n #easteregg");
    client.sendMessage(message.from, "Silahkan dipilih menu yang tersedia dengan *#* sesuai command yang ada di menu");
  }
  // membaca API dari ipify.org untuk menampilkan IP Address dari pengirim pesan
  if (message.body === "#ping") {
    const axios = require("axios");
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        client.sendMessage(message.from, "Yeay berhasil mengirim pesan");
        client.sendMessage(message.from, `IP Address kamu adalah ${response.data.ip}`);
      })
      .catch((error) => {
        console.log(error);
        client.sendMessage(message.from, "Gagal mengirim pesan. Silahkan coba lagi");
      });
  }
  // membuat pesan balasan #pacar
  if (message.body === "#pacar") {
    client.sendMessage(message.from, "kreator yang buat bot ini, belum ada pacar 🗿");
  }
  // membuat pesan balasan #ucapan dengan waktu
  if (message.body === "#ucapan") {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      client.sendMessage(message.from, "Selamat Pagi, semangat bekerja, sekolah, dan kuliah.");
    } else if (curHr < 18) {
      client.sendMessage(message.from, "Selamat Siang, yuk istirahat dan makan siang.");
    } else {
      client.sendMessage(message.from, "Malamm... yuk setelah ber-aktifitas seharian jangan lupa istirahat minimal 8 Jam ya supaya tetap fresh.");
    }
  }
  // membuat pesan balasan #socialmedia
  if (message.body === "#socialmedia") {
    client.sendMessage(message.from, "Instagram: https://www.instagram.com/almas_a45amg \n Whatsapp: https://wa.me/6281326685581 \n Github: https://github.com/masnajeeeeb27");
  }
  // membuat pesan balasan #uptime dengan waktu saat ini
  if (message.body === "#uptime") {
    client.sendMessage(message.from, "Uptime Bot : " + new Date());
  }
  // membuat pesan balasan #easteregg
  if (message.body === "#easteregg") {
    client.sendMessage(message.from, "63 61 72 61 20 64 65 6B 72 69 70 73 69 6E 79 61 20 67 69 6D 61 6E 61 20 64 61 68 3F 20 63 6F 62 61 20 64 6F 6E 67 20 50 43 20 6B 65 20 6B 72 65 61 74 6F 72 6E 79 61 20 79 61 2E.");
  }
});

client.initialize();
