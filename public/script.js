const toggleBtn = document.getElementById('togglePost');
const form = document.getElementById('createForm');
const postsDiv = document.getElementById('posts');

toggleBtn.onclick = () => {
  form.style.display = form.style.display === 'none' ? 'flex' : 'none';
};

async function loadPosts() {
  const res = await fetch('/api/posts');
  const data = await res.json();

  postsDiv.innerHTML = '';

  data.forEach((p) => {
    const box = document.createElement('div');
    box.className = 'post';

    const name = p.displayName || '<i>Anonymous</i>';

    box.innerHTML = `
        <div class="name">${name}</div>
        <div class="text">${p.text}</div>
      `;

    if (p.fileUrl) {
      if (p.fileType.startsWith('image')) {
        const img = document.createElement('img');
        img.src = p.fileUrl;
        box.appendChild(img);
      } else {
        const a = document.createElement('a');
        a.href = p.fileUrl;
        a.textContent = 'Download file';
        a.style.color = '#5669f6';
        box.appendChild(a);
      }
    }

    const t = document.createElement('div');
    t.className = 'time';
    t.textContent = p.createdAt;
    box.appendChild(t);

    postsDiv.prepend(box);
  });
}

document.getElementById('sendBtn').onclick = async () => {
  const name = document.getElementById('nameInput').value;
  const text = document.getElementById('textInput').value;
  const file = document.getElementById('fileInput');

  const dataToSend = {
    displayName: name,
    text: text,
  };

  await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });

  document.getElementById('nameInput').value = '';
  document.getElementById('textInput').value = '';
  document.getElementById('fileInput').value = '';
  form.style.display = 'none';

  loadPosts();
};

loadPosts();
setInterval(loadPosts, 10000);
