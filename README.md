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

## Struktura
- docker/ – zawiera pliki Dockerfile i konfiguracje dla poszczególnych technologii.
- symfony/ – kod źródłowy backendu Symfony.
- react/ – kod źródłowy frontend React.
- docker-compose.yml – definiuje wszystkie kontenery i ich sieci, porty oraz zależności.

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