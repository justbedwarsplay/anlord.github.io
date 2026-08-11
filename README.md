# anlord033 — Developer Portfolio

Премиальный статический сайт-портфолио разработчика: Minecraft-плагины, Telegram-боты,
автоматизация и кастомные программные решения. Полностью статичен — работает на
**GitHub Pages** без бэкенда, баз данных и серверного кода.

> **Живой сайт:** https://justbedwarsplay.github.io/
> **Контакты:** [Telegram @anlord033](https://t.me/anlord033) · [GitHub](https://github.com/justbedwarsplay)

---

## Стек

| Слой | Технологии |
|------|-----------|
| Разметка | HTML5 (семантика), SVG (иконки, логотип, генерируемые превью) |
| Стили | CSS3 — glassmorphism, glow, градиенты, адаптивная сетка на CSS-переменных |
| Логика | Vanilla JavaScript (без сборщиков и фреймворков) |
| 3D / графика | Three.js (CDN), WebGL-частицы |
| API браузера | `IntersectionObserver`, `requestAnimationFrame`, `matchMedia` |
| Языки | Java, Kotlin, Python, C, C++, Rust, JavaScript |
| Платформа | Spigot, Paper, PacketEvents, Telegram API, PyTorch, Gradle, Docker |

---

## Структура

```
portfolio/
├── index.html        # разметка всех секций
├── style.css         # дизайн-система (CSS-переменные)
├── script.js         # логика + ВСЁ редактируемое содержимое (объект CONFIG)
├── assets/
│   ├── icons/
│   │   ├── logo.svg
│   │   └── favicon.svg
│   └── images/       # опционально: картинки проектов
└── README.md
```

---

## Как редактировать содержимое

Всё, что видит посетитель (имя, контакты, проекты, технологии, статистика), вынесено в
объект `CONFIG` в начале `script.js`. Логику трогать не нужно.

```js
const CONFIG = {
  name: "anlord033",                       // имя разработчика (везде на сайте)
  contacts: {
    telegram: "https://t.me/anlord033",   // CTA + футер
    github:   "https://github.com/justbedwarsplay"
  },
  stats: [ { label: "Custom Development", value: 40 }, /* … */ ],
  technologies: ["Java", "Kotlin", "Python", "C", "C++", "Rust", /* … */ "Docker"],
  projects: [ /* см. ниже */ ]
};
```

### Проекты

Каждый проект — объект в массиве `CONFIG.projects`. Превью генерируется автоматически
по полю `kind` (`minecraft` · `telegram` · `automation` · `network` · `ai`).

```js
{
  title: "Minecraft Anti-Cheat",
  kind: "minecraft",
  description: "Краткое описание карточки.",
  task: "Что нужно было решить.",
  solution: "Как решили.",
  technologies: ["Java", "Spigot", "PacketEvents"],
  results: "Что получили в итоге.",
  link: "https://github.com/justbedwarsplay"  // ссылка на GitHub проекта
}
```

> Указывайте только реальные проекты. Чтобы использовать свою картинку вместо
> сгенерированного превью, добавьте поле `image: "assets/images/foo.png"`.

---

## Локальный запуск

Любой статический сервер. Через Python:

```bash
# из папки проекта
python -m http.server 8000
# открыть http://localhost:8000
```

Или просто откройте `index.html` в браузере (3D грузится с CDN, нужен интернет).

---

## Публикация на GitHub Pages

1. Загрузите файлы (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`) в корень репозитория.
2. **Settings → Pages → Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`, папка `/ (root)`
   - **Save**.
3. Через 1–2 минуты сайт доступен по адресу:
   - для репозитория `<username>.github.io` → `https://<username>.github.io/`
   - для обычного репозитория → `https://<username>.github.io/<repo>/`

### Кастомный домен (опционально)

В **Settings → Pages** укажите свой домен; GitHub создаст файл `CNAME` в корне.

---

## Производительность и доступность

- Количество частиц и сложность 3D автоматически снижаются на мобильных
  (`perfTier` low/med/high в `script.js`).
- Уважается `prefers-reduced-motion` — тяжёлые анимации отключаются.
- Адаптив: 1920×1080, 1440×900, 1280×720, планшеты, смартфоны (hamburger-меню).
- Сцены Three.js откатываются к текстовому плейсхолдеру при ошибке WebGL.

---

## Лицензия

Свободно для использования и модификации.
