# Cocktail King
Aplikacja stworzona z myślą o miłośnikach koktajli, drinków i szeroko pojętej kultury barmańskiej. To idealne narzędzie zarówno dla amatorów, którzy chcą zaimponować znajomym na imprezie, jak i dla bardziej doświadczonych entuzjastów miksologii. Setki przepisów na koktajle, listy składników, porady barmańskie oraz ciekawostki o pochodzeniu i historii najpopularniejszych alkoholi i koktaili. Dzięki tej aplikacji nie tylko przygotujesz idealnego drinka, ale też zabłyśniesz wiedzą w towarzystwie.

## Wymagania
- Docker zainstalowany na komputerze

## Obsługa
W terminalu, w głównym katalogu projektu, uruchomić kontenery:
- docker-compose up

Po uruchomieniu:
- Aplikacja dostępna jest pod adresem: http://localhost:8000

Wyłączenie kontenerów:
- docker-compose down

## Technologie
- Symfony backend aplikacji, obsługuje logikę biznesową, REST API oraz komunikację z bazą danych.
- React - frontend, odpowiada za interfejs użytkownika i konsumpcję API Symfony.
- PostgreSQL - baza danych przechowująca wszystkie dane aplikacji.
- pgAdmin - narzędzie do zarządzania i podglądu bazy danych w PostgreSQL.
- Docker - umożliwia uruchamianie wszystkich usług w odizolowanych kontenerach, co ułatwia konfigurację, wdrożenie i testowanie projektu

Wszystkie komponenty działają w odizolowanych kontenerach Dockerowych i komunikują się w ramach wspólnej sieci (app-network).

## Mechanizm autoryzacji i przekierowań
Aplikacja implementuje kontrolę dostępu i automatyczne przekierowania w zależności od statusu zalogowania użytkownika.

### Użytkownik niezalogowany
Ma dostęp tylko do następujących stron:
- /login – formularz logowania
- /register – rejestracja nowego użytkownika
- Próba wejścia na inną stronę powoduje automatyczne przekierowanie na stronę logowania /login

### Użytkownik zalogowany
Ma dostęp do następujących stron:
- /dashboard – strona główna aplikacji
- Próba wejścia na inną stronę powoduje automatyczne przekierowanie na stronę główną /dashboard

## Struktura
- docker/ – zawiera pliki Dockerfile i konfiguracje dla poszczególnych technologii.
- symfony/ – kod źródłowy backendu Symfony.
- react/ – kod źródłowy frontend React.
- postgres/ - pliki bazy danych postgreSQL
- docker-compose.yml – definiuje wszystkie kontenery i ich sieci, porty oraz zależności.

## Budowanie i wdrażanie frontendu React w środowisku Symfony 
1. Wejście do katalogu z projektem React
- cd react
2. Zbudowanie aplikacji produkcyjnej
- npm run build
3. Skopiowanie wygenerowanych plików do katalogu public Symfony
- cp -r build/* ../symfony/public
4. Przebudowanie i uruchomienie kontenerów Dockera
docker compose build
docker compose up

## Informacje dodatkowe
Do kontenera kopiowany jest composer - [Dockerfile](/docker/backend/Dockerfile)

### W kontenerze wykonano polecenia:
- composer create-project symfony/skeleton .
- composer require symfony/maker-bundle --dev
Utworzone pliki znajdują w katalogu /symfony, katalog /symfony jest mapowany jako wolumin w [docker-compose.yaml](/docker-compose.yaml)

## Testowanie
Na ten moment aplikacja nie zawiera zautomatyzowanych testów. Testy manualne są wykonywane przez użytkownika w środowisku lokalnym.

## Autorzy
Wiktor Sztefko – projekt, kod, dokumentacja