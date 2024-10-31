
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000
app.use(bodyParser.json());

//veri depolama örnekte kullanıcılar listesi
let users = [];
// Tüm kullanıcıları getir
app.get('/users', (req, res) => {
  res.json(users);
});

//  Belirli bir kullanıcıyı ID ile getir
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  res.json(user);
});

// Yeni bir kullanıcı oluştur
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1, // Basit bir ID üretimi
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Belirli bir kullanıcıyı güncelle
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

//Belirli bir kullanıcıyı sil
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
