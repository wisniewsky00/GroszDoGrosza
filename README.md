# 💰 GroszDoGrosza

Aplikacja internetowa wspierająca edukację finansową oraz budowę i analizę podstawowych portfeli inwestycyjnych.  
Projekt zrealizowany w ramach pracy inżynierskiej na kierunku Informatyka.

---

## 📌 Opis projektu

GroszDoGrosza to aplikacja webowa typu klient–serwer umożliwiająca:

- rejestrację i uwierzytelnianie użytkowników,
- przegląd treści edukacyjnych z zakresu inwestowania,
- tworzenie i zarządzanie portfelami inwestycyjnymi,
- rejestrowanie transakcji kupna i sprzedaży,
- analizę struktury portfela (wagi modelowe vs rzeczywiste),
- wizualizację zmian wartości portfela w czasie.

Aplikacja została zaprojektowana w architekturze trójwarstwowej z wyraźnym podziałem na frontend, backend oraz warstwę danych.

---

## 🛠 Technologie

### Frontend
- React (Vite)
- JavaScript
- Axios
- Recharts
- CSS

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT (JSON Web Token)

### Baza danych
- MySQL

---

## 🏗 Architektura

Projekt oparty jest na architekturze klient–serwer:

[ React Frontend ]  <---REST API--->  [ Spring Boot Backend ]  --->  [ MySQL ]

- Frontend odpowiada za prezentację danych i interakcję z użytkownikiem.
- Backend realizuje logikę biznesową oraz mechanizmy bezpieczeństwa.
- Baza danych przechowuje dane użytkowników, portfeli oraz transakcji.

---

## 📂 Struktura projektu
groszdogrosza/
│
├── backend/
│ ├── src/main/java/
│ ├── src/main/resources/
│ └── pom.xml
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
└── README.md


---

## 🔐 Mechanizmy bezpieczeństwa

- Haszowanie haseł (bcrypt)
- Uwierzytelnianie oparte na JWT
- Weryfikacja adresu e-mail przy rejestracji
- Ochrona zasobów przed dostępem nieautoryzowanym
- Kontrola dostępu do danych użytkownika

---

## 🚀 Uruchomienie projektu lokalnie

### 1️⃣ Wymagania
- Java 17+
- Node.js 18+
- MySQL 8+

---

### 2️⃣ Konfiguracja bazy danych

Utwórz bazę danych w MySQL:

```sql
CREATE DATABASE groszdogrosza;
```
Zaimportuj plik bazy danych grosz_do_grosza.sql
---

## ⚙️ Konfiguracja backendu (application.properties)

Plik konfiguracyjny znajduje się w:

backend/src/main/resources/application.properties

Przykładowa konfiguracja:

```properties
# ===============================
# =         BAZA DANYCH        =
# ===============================

spring.datasource.url=jdbc:mysql://localhost:3306/groszdogrosza
spring.datasource.username=root
spring.datasource.password=twoje_haslo
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# ===============================
# =            JWT              =
# ===============================

app.jwt.secret=TwojSekretnyKluczJWT
app.jwt.expiration=86400000

# ===============================
# =         KONFIGURACJA MAIL   =
# ===============================

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=twoj_email@gmail.com
spring.mail.password=twoje_haslo_aplikacji
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```
---

## ⚛️ Konfiguracja i uruchomienie frontendu

Frontend aplikacji został zbudowany przy użyciu React (Vite).

### 📋 Wymagania

- Node.js 18+
- npm 9+ (lub yarn)

Sprawdzenie wersji:

```bash
node -v
npm -v
```

### 📦 Instalacja zależności
Przejdź do katalogu frontend:
```bash
cd frontend
```
Zainstaluj wszystkie zależności:
```bash
npm install
```

### ▶️ Uruchomienie w trybie deweloperskim
W katalogu frontend:
```bash
npm run dev
```

---

## 🧪 Testowanie

Aplikacja została przetestowana na poziomie interfejsu użytkownika oraz interfejsu REST API.

### Zakres testów:

- rejestracja i logowanie użytkownika,
- weryfikacja adresu e-mail,
- zarządzanie portfelami inwestycyjnymi,
- dodawanie i usuwanie transakcji,
- wizualizacja danych portfela,
- poprawność walidacji formularzy,
- kontrola dostępu do chronionych zasobów,
- poprawność kodów odpowiedzi HTTP (200, 400, 401).

Testy API przeprowadzono przy użyciu narzędzia Postman.

Architektura aplikacji umożliwia łatwe rozszerzenie projektu o testy jednostkowe w przyszłości.

---

## 📈 Możliwe kierunki rozwoju

- Rozbudowa modułu analitycznego (bardziej zaawansowane raporty i statystyki).
- Integracja z dodatkowymi źródłami danych rynkowych.
- Wprowadzenie testów jednostkowych i integracyjnych.
- Konteneryzacja aplikacji (Docker) oraz wdrożenie w środowisku produkcyjnym.
- Rozszerzenie funkcjonalności o moduł społecznościowy (forum użytkowników).

---

## 👤 Autor

Krystian Wiśniewski  
Projekt zrealizowany w ramach pracy inżynierskiej  
Kierunek: Informatyka  
Uniwersytet Jana Kochanowskiego w Kielcach