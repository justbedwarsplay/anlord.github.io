# An Lord — Developer Portfolio

Премиальный статический сайт-портфолио разработчика (Minecraft-плагины, Telegram-боты, автоматизация и кастомные решения). Полностью статический — работает на **GitHub Pages** без бэкенда.

## Технологии

- **HTML5** + семантичная разметка
- **CSS3** — glassmorphism, glow, градиенты, адаптивная сетка
- **Vanilla JavaScript** — без сборщиков и фреймворков
- **Three.js** (через CDN `unpkg`) — 3D-сцена в Hero и блок «архитектура»
- **SVG** — иконки, логотип, генерируемые превью проектов
- WebGL-частицы, `IntersectionObserver`, `requestAnimationFrame`

## Структура

```
/
├── index.html        # вся разметка секций
├── style.css         # дизайн-система (CSS-переменные)
├── script.js         # логика + ВСЁ редактируемое содержимое (CONFIG)
├── assets/
│   ├── icons/
│   │   ├── logo.svg
│   │   └── favicon.svg
│   └── images/       # (опционально: изображения проектов)
└── README.md
```

## Как редактировать содержимое

Всё, что видит клиент (имя, контакты, проекты, технологии, статистика), вынесено в
объект `CONFIG` в начале `script.js`. Не нужно трогать логику.

### Имя разработчика

```js
const CONFIG = {
  name: "An Lord",
  ...
}
```

### Контакты (Telegram / GitHub)

```js
contacts: {
  telegram: "https://t.me/anlord",
  github:   "https://github.com/anlord"
}
```

Эти ссылки автоматически подставляются в CTA-кнопки и футер.

### Проекты

```js
projects: [
  {
    title: "Minecraft Anti-Cheat",
    kind: "minecraft",                 // стиль сгенерированного превью:
                                      // minecraft | telegram | automation | network | ai
    description: "Краткое описание…",
    task: "Что нужно было решить…",
    solution: "Как решили…",
    technologies: ["Java", "Spigot", "PacketEvents"],
    results: "Что получили…",
    link: "https://github.com/anlord"  // ссылка на GitHub проекта
  },
  ...
]
```

> **Важно:** здесь указывайте только реальные проекты. Превью генерируется
> автоматически по полю `kind`; если хотите свою картинку — добавьте поле
> `image: "assets/images/foo.png"` и подключите его в разметке карточки.

### Технологии

```js
technologies: ["Java", "Python", "JavaScript", /* … */ "GitHub"]
```

### Hero-статистика

```js
stats: [
  { label: "Custom Development", value: 40 },
  ...
]
```

## Локальный запуск (для проверки)

Любой статический сервер. Например, через Python:

```bash
# из папки проекта
python -m http.server 8000
# откройте http://localhost:8000
```

Или просто откройте `index.html` в браузере (3D через CDN требует интернета).

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub (например, `portfolio`) и загрузите в него
   `index.html`, `style.css`, `script.js`, папку `assets/` и `README.md`.
2. В репозитории перейдите в **Settings → Pages**.
3. В разделе **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** выберите `main` (или `master`) и папку `/ (root)`
   - Нажмите **Save**.
4. Через 1–2 минуты сайт будет доступен по адресу:
   `https://<ваш-username>.github.io/<имя-репозитория>/`

### Если репозиторий — это `<username>.github.io`

Этот домен публикует ветку `main` из корня автоматически; адрес:
`https://<username>.github.io/`

### Кастомный домен (опционально)

В **Settings → Pages** укажите свой домен и добавьте `CNAME` в корень репозитория.

## Производительность и доступность

- Количество частиц и сложность 3D автоматически снижаются на мобильных
  (`perfTier` low/med/high в `script.js`).
- Уважается `prefers-reduced-motion` — отключаются тяжёлые анимации.
- Адаптив под 1920×1080, 1440×900, 1280×720, планшеты и смартфоны.
- Сцены Three.js откатываются к текстовому плейсхолдеру при ошибке WebGL.

## Лицензия

Свободно для использования и модификации.
