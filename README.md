
# 💼 WealthTrack 

WealthTrack is a Vue.js-based Investment Portfolio Management System that enables seamless management of clients and their portfolios. It eliminates data loss, avoids miscommunication, and improves client engagement by providing an intuitive interface to manage users and their investments.

---

## 🚀 Features
- **Client Management**  
  - Add, edit, and delete clients.  
  - Store client information including name, email, and phone number.  
  - Persist client data in localStorage.  

- **Portfolio Management**  
  - Create, edit, and delete investment portfolios.  
  - Assign portfolios to clients using client IDs.  
  - Track attributes such as portfolio name, status (UPCOMING | ACTIVE | CLOSED), initial investment, start date, and notes.  
  - Manage holdings (symbol, quantity, average price).  

- **Filtering and Listing**  
  - Filter portfolios by status (Upcoming, Active, Closed).  
  - Display portfolios in clean, card-based layouts.  
  - Show invested amount in visually appealing format with currency formatting.  

- **Validation**  
  - Form validation powered by Zod + Vee-Validate.  
  - Ensure required fields, valid email formats, and numeric validations.  

- **UI/UX**  
  - Built with TailwindCSS for responsive and modern design.  
  - PrimeVue icons for enhanced visuals.  
  - Friendly empty states for “No users” or “No portfolios.”  
  - Highlighted invested amounts for better readability.  

- **State Management**  
  - Centralized Vuex store for managing users and portfolios.  
  - Getters for easy access (`getUserById`, `getPortfolioById`, `portfoliosByStatus`).  
  - LocalStorage integration ensures persistence even after page reloads.  

---

## 🛠️ Tech Stack
- **Vue 3** with Vite  
- **Vuex** for state management  
- **Vue Router** for navigation  
- **TailwindCSS** for styling  
- **PrimeVue** icons  
- **Vee-Validate + Zod** for form validation  
- **LocalStorage** for persistence  

---

## 📂 Project Logic Overview
- **User Management**: Create and manage clients with unique IDs generated using `uuid`.  
- **Portfolio Management**: Each portfolio is tied to a client via `clientId` and includes attributes like name, status, investment, and holdings.  
- **Validation Flow**: On form submission, values are validated against schemas before saving.  
- **State Flow**: Actions handle portfolio/user creation by adding IDs and timestamps, mutations update the Vuex state, and changes are persisted in localStorage.  
- **UI Rendering**: Components fetch state data via getters, display formatted portfolio details, and render dynamic tables for holdings.  

---

## 📦 Installation and Setup

Clone the repository:
```bash
git clone <YOUR_REPO_LINK>
cd investment-portfolio
````

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```bash
http://localhost:5173/
```

---

## 🎯 How to Use

* Navigate to **Clients** to add client details.
* Create a new **Portfolio** under the **Portfolios** section.
* Assign the portfolio to a client and enter details such as **investment amount** and **start date**.
* Edit or delete portfolios as required.
* Open a portfolio’s detail page to view the **invested amount, notes, and holdings** in a structured format.

---
