// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJz4COZ_NKgtziL9wvWEEPyZFN6OkjyPM",
    authDomain: "autentikasi-study.firebaseapp.com",
    projectId: "autentikasi-study",
    storageBucket: "autentikasi-study.firebasestorage.app",
    messagingSenderId: "308799563471",
    appId: "1:308799563471:web:d795c8f30695b1c89439ba"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Fungsi untuk menampilkan modal alert
function showAlert(message) {
  const alertModal = document.getElementById('alertModal');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.innerText = message;
  alertModal.style.display = 'block';}

// Fungsi Registrasi
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    showAlert(`Registrasi berhasil! User: ${userCredential.user.email}`);
    // Redirect setelah 2 detik
  setTimeout(() => {
    window.location.href = "homepage.html"; // Ganti dengan path ke halaman utama Anda
  }, 1500); // 2000 ms = 2 detik
  } catch (error) {
    showAlert(`Error: ${error.message}`);
  }
});

// Fungsi Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      showAlert(`Login berhasil! Selamat datang, ${userCredential.user.email}`);
      
      // Redirect setelah 2 detik
      setTimeout(() => {
        window.location.href = "homepage.html"; // Ganti dengan path ke halaman utama Anda
      }, 1500); // 1500 ms = 1,5 detik
    } catch (error) {
      // Ganti pesan error dengan yang lebih ramah pengguna
      let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      
      // Periksa jenis kesalahan dan sesuaikan pesan
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email atau password tidak valid.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email tidak valid.';
      }
      
      showAlert(errorMessage);
    }
  });
  
  