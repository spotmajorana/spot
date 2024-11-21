document.getElementById('spotForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Evita il comportamento predefinito del form (rinfrescare la pagina)

  const message = document.getElementById('spotMessage').value;

  if (!message) {
    alert('Per favore, inserisci un messaggio.');
    return;
  }

  try {
    const response = await fetch('https://server-1wgq.onrender.com/api/send-spot', {  // Modificato URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        user_id: 'anonimo', // Qui puoi gestire l'ID utente se necessario
        timestamp: new Date().toISOString()
      })
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById('statusMessage').innerText = 'Spot inviato con successo!';
      document.getElementById('spotMessage').value = ''; // Pulisce la textarea
    } else {
      document.getElementById('statusMessage').innerText = 'Errore: ' + data.error;
    }
  } catch (error) {
    console.error('Errore durante l\'invio dello spot:', error);
    document.getElementById('statusMessage').innerText = 'Si è verificato un errore. Riprova più tardi.';
  }
});
