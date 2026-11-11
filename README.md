# 📝 Notes App

A full-stack Notes Management Application built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**.

Create, manage, organize, and search your notes through a clean and user-friendly interface.

## ✨ Features

- **Create Notes:** Add notes with titles, descriptions, and categories.
- **View Notes:** Display all saved notes.
- **Update Notes:** Edit existing notes whenever needed.
- **Delete Notes:** Remove notes you no longer need.
- **Search Notes:** Search notes by title, content, or category.
- **Category Filter:** Organize notes into College, Personal, Work, and Ideas.
- **Pin & Unpin:** Keep important notes at the top.
- **Show More / Show Less:** Expand or collapse lengthy descriptions.
- **MongoDB Database:** Store notes persistently.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Structure |
| CSS | Styling and animations |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | Database modelling |

## 📂 Project Structure

```text
notes-app/
│
├── models/
│   └── Note.js
│
├── routes/
│   └── notes.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sreenandana29/notes-app.git
```

### 2. Open the project folder

```bash
cd notes-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace the MongoDB value with your own connection string.

### 5. Start the application

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5000
```

## 🔐 Security

- Environment variables are stored in `.env`.
- Sensitive credentials are excluded from Git using `.gitignore`.

## 👩‍💻 Developer

**Sreenandana G**

GitHub: [Sreenandana29](https://github.com/Sreenandana29)

---

⭐ If you find this project interesting, feel free to explore the repository!