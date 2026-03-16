const URL_PLANILHA = "https://script.google.com/macros/s/AKfycbzw3IwLroDlZqRxjovQGF60nJ0k2b3ENnNB-OZkk9_e_kENvO9wBWeiCR1YJugkpOdW/exec";

// Função para buscar o que os outros postaram
async function carregarPosts() {
    const response = await fetch(URL_PLANILHA);
    const posts = await response.json();
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; 

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = `<div class="user-info">👤 ${post[0]}</div><p>${post[1]}</p>`;
        feed.appendChild(div);
    });
}

// Função para enviar o post para a planilha
async function publicar() {
    const texto = document.getElementById('postInput').value;
    const nome = localStorage.getItem('usuario_praca');
    if (!texto) return;

    await fetch(URL_PLANILHA, {
        method: 'POST',
        body: JSON.stringify({ nome: nome, conteudo: texto })
    });

    document.getElementById('postInput').value = '';
    carregarPosts();
}

// Atualiza o feed automaticamente a cada 10 segundos
setInterval(carregarPosts, 10000);
carregarPosts();
