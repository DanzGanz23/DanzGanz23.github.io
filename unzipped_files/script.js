const input = document.querySelector('.chat-input input');
const chatWindow = document.querySelector('.chat-window');
const welcomeMessageDiv = document.getElementById('welcome-message');

// Fungsi untuk menambahkan chat bubble
const addChatBubble = (message, type) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', type, 'animate__animated', 'animate__fadeInUp');

  // Tambahkan pesan ke dalam bubble
  messageDiv.innerHTML = `
        <div class="message-bubble">${message}</div>
    `;

  chatWindow.appendChild(messageDiv);

  // Scroll otomatis ke bagian bawah setiap kali pesan baru ditambahkan
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Fungsi untuk menampilkan ucapan selamat sesuai waktu
const displayWelcomeMessage = () => {
  const now = new Date();
  const hour = now.getHours();
  let greeting = '';
  let imageUrl = '';
  let quote = '';

  // Tentukan ucapan dan gambar berdasarkan waktu
  if (hour >= 4 && hour < 12) {
    greeting = 'Selamat Pagi!';
    quote = 'Setiap pagi adalah kesempatan baru. Semangat yah memulai hari! 😚';
    imageUrl = 'img/pap/pap4.png'; // Ganti dengan path gambar yang sesuai
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Selamat Siang!';
    quote = 'Jangan lupa untuk istirahat sejenak, karena kamu layak untuk bersantai! ☺';
    imageUrl = 'img/pap/pap2.png'; // Ganti dengan path gambar yang sesuai
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Selamat Sore!';
    quote = 'Setiap sore adalah waktu untuk merenung dan bersyukur atas hari ini. 😙';
    imageUrl = 'img/pap/pap6.png'; // Ganti dengan path gambar yang sesuai
  } else {
    greeting = 'Selamat Malam!';
    quote = 'Istirahatlah dengan tenang. Besok adalah hari baru penuh harapan. 🌙';
    imageUrl = 'img/pap/pap11.png'; // Ganti dengan path gambar yang sesuai
  }

  // Tambahkan ucapan dan gambar ke div
  welcomeMessageDiv.innerHTML = `
        <div class="welcome-bubble">
            <img src="${imageUrl}" alt="Greeting Image" class="welcome-image">
            <p>${greeting}<br>${quote}</p>
        </div>
    `;
};

// Panggil fungsi untuk menampilkan ucapan saat halaman dimuat
displayWelcomeMessage();

// Event listener untuk tombol kirim
document.querySelector('.fa-paper-plane').addEventListener('click', async () => {
  const userInputValue = input.value.trim();

  if (userInputValue) {
    // Tampilkan pesan pengguna
    addChatBubble(userInputValue, 'user');
    input.value = ''; // Bersihkan input

    // Cek respon dari bot
    let botResponse = '';

    // Respons bot berdasarkan pesan pengguna
    if (userInputValue.toLowerCase().includes("makan")) {
      botResponse = "Sudah makan belum? Jangan lupa makan yang sehat ya! 😊";
    } else if (userInputValue.toLowerCase().includes("hari ini")) {
      botResponse = "Bagaimana hari kamu? Ada yang menyenangkan hari ini?";
    } else if (userInputValue.toLowerCase().includes("nama kamu") || userInputValue.toLowerCase().includes("siapa namamu")) {
      botResponse = "Nama saya adalah CYNIX, yang dikembangkan oleh tim AVERENGE. Pemilik saya adalah Dani Mulyawan.";
    } else {
      // Menggunakan API untuk mendapatkan respons
      try {
        const response = await fetch(`https://widipe.com/openai?text=${encodeURIComponent(userInputValue)}`);
        const data = await response.json();

        // Proses respons dan ubah menjadi kasual
        botResponse = data.result
          .replace(/Anda/g, 'Lu')
          .replace(/Apakah/g, 'Apa')
          .replace(/dapat/g, 'bisa')
          .replace(/merupakan/g, 'adalah')
          .replace(/terima kasih/g, 'thanks')
          .replace(/saya/g, 'gua');
      } catch (error) {
        botResponse = `Error: ${error.message}`;
      }
    }

    // Tambahkan respons bot ke chatbox
    addChatBubble(botResponse, 'bot');
  }
});

// Fungsi untuk memutar audio saat tombol diklik
document.getElementById('playButton').addEventListener('click', function() {
  var audio = document.getElementById('audio');
  audio.play();
});

// Fungsi untuk membuka full screen
function openFullscreen() {
    let elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
        elem.msRequestFullscreen();
    }
}

// Menampilkan SweetAlert untuk izin full-screen
Swal.fire({
    title: 'Ingin menggunakan mode layar penuh?',
    text: "Untuk pengalaman yang lebih baik, aktifkan mode full-screen.",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, aktifkan!',
    cancelButtonText: 'Tidak'
}).then((result) => {
    if (result.isConfirmed) {
        openFullscreen(); // Memasuki full screen jika user menyetujuinya
    }
});

// Menambahkan listener untuk prompt "Add to Home Screen"
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();  // Mencegah prompt langsung tampil
    Swal.fire({
        title: 'Tambahkan ke Home Screen?',
        text: 'Akses cepat dengan menambahkan aplikasi ke layar utama!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tambahkan',
        cancelButtonText: 'Tidak, terima kasih'
    }).then((result) => {
        if (result.isConfirmed) {
            e.prompt();  // Menampilkan prompt asli untuk Add to Home Screen
        }
    });
});
