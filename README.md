# 🗓️ Day 2: Notes App | 30-Day Full-Stack Challenge

<div align="center">
  
  ![Day 2 Progress](https://img.shields.io/badge/Challenge-Day%202%20of%2030-blueviolet?style=for-the-badge&logo=calendar)
  ![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
  ![React](https://img.shields.io/badge/Frontend-React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![MySQL](https://img.shields.io/badge/Database-MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

  <p align="center">
    <strong>"One Day, One Complete Full-Stack Project."</strong><br />
    Yesterday: <i>Todo App (Day 1)</i> ➜ <strong>Today: Canvas Notes App (Day 2)</strong> ➜ Tomorrow: <i>Stay Tuned!</i>
  </p>

  <h4>
    <a href="#-the-project">The Project</a> •
    <a href="#-features">Features</a> •
    <a href="#-engineering-challenges-solved">Lessons Learned</a> •
    <a href="#-challenge-dashboard">Challenge Roadmap</a>
  </h4>
</div>

---

## 🎯 The Challenge & Project Target
As part of an aggressive daily building sprint, **Day 2** scales past standard binary task tracking (from Day 1's Todo App) into **unstructured text processing and relational data persistence**. 

The goal for today was to craft a lightning-fast, visually premium digital canvas where users can draft, update, read, and delete multi-paragraph workspace summaries synchronously connected to a live MySQL engine.

<div align="center">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80" alt="Canvas Notes UI Preview" width="100%" style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" />
</div>

---

## ✨ Features Implemented (Within 24 Hours)

### 📐 Sticky Split-Panel Layout
- Ditched standard blocky inputs for a modern **3-column dashboard topology**.
- Features an isolated, sticky configuration panel on the left side, keeping text input fixed while records stack infinitely into a dynamic, responsive grid on the right side.
- Optimized text layout properties utilizing `whitespace-pre-wrap` to retain user indentations, line breaks, and formatting natively from raw textareas.

### ⚡ Atomic CRUD Processing
- Fully bound lifecycle actions mapping the client runtime state to database transactions.
- Implemented contextual UI transitions: hitting "Edit" instantly transforms the active creation panel into **Edit Mode**, modifying existing records seamlessly without identity collisions or page refreshing.

---

## 🛠️ Tech Stack & Production Tooling
* **Frontend Core:** React 19, JavaScript (ES6+), Vite Bundler Engine
* **Styling Matrix:** Tailwind CSS (Rounded design accents, custom micro-interactions, `active:scale-[0.98]` button feedbacks)
* **Backend Pipeline:** Spring Boot 3.x, Spring Data JPA, Hibernate Core
* **Data Layer:** MySQL Server, HikariCP Connection Pooling

---

## 🛑 Engineering Challenges Solved (Today's Battles)

Building an entirely fresh stack in 24 hours forces you to solve real framework errors rapidly. Today’s major debugging victories included:

| Exception Traced | Root Cause | Architectural Solution |
| :--- | :--- | :--- |
| `MysqlDataTruncation: Data too long...` | Hibernate mapped strings to standard `VARCHAR(255)`, crashing the app on long content drafts. | Modified schema compilation on the entity model using `@Column(columnDefinition = "TEXT")`. |
| `HibernateException: Identifier altered from 22 to null` | Sending raw frontend payloads stripped the original tracked entity's primary key during `PUT` requests. | Removed dangerous `setId()` mutations. Switched to a robust **Fetch-then-Update** transactional service sequence. |
| `PlaceholderResolutionException ... in value "/notes/${id}"` | Mixing up JavaScript string literal interpolation formatting inside Spring Boot Java annotations. | Aligned routing paths using proper token variable brackets: `@PutMapping("/notes/{id}")`. |

---

## 📅 The 30-Day Full-Stack Dashboard

Follow along with my daily progress as I build a new full-stack system every single day:

- [x] **Day 1:** 🎯 Todo App — *Basic State & Structural Array Mutations*
- [x] **Day 2:** 📝 **Canvas Notes App — *Relational Entity Updates & Infinite Text Layouts* (Current)**
- [ ] **Day 3:** 🚀 *Upcoming Project...*

---
<p align="center"><strong>Fueling the hustle, one app at a time. See you tomorrow for Day 3!</strong> 🔥</p>
