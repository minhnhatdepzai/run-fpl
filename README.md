# Run FPL

Personalized 3D platform game branded as **Run FPL** for Lê Minh Nhật. It is
based on a local mirror of the public Claybound browser demo captured on
2026-10-04, with local assets, expanded worlds, original anime-style character
presets, smoother motion defaults, and personal contact links.

The default character is the blue **Doraemon** slot (implemented with the
project's original robot-cat model). The title screen includes eight quick
scenery buttons that launch the canyon, lava cave, breathing forest, hanging
city, dream, marble quarry, egg run, or fired-night world directly.

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173/`).

## Production check

```bash
npm run build
npm run preview
```

The game assets live under `assets/` and the compiled application, fonts,
audio, and UI artwork live under `bundle/`. All worlds are available from the
**Phong cảnh / Worlds** menu and the quick scenery panel. Character and
language selection are available under **Cài đặt / Settings**. Vietnamese is
the default UI language; the VI/EN choice is stored in `localStorage` under
`run-fpl-language`.

The contact/newsletter page stores test addresses locally and does not submit
them to the source site's database. Upstream artwork, audio, models, and game
code remain the property of their respective owner; obtain permission before
public redistribution.

## Public site

GitHub Actions builds and deploys the `main` branch to:

<https://minhnhatdepzai.github.io/run-fpl/>

The game has no backend account or cloud save. Progress, checkpoints,
character choice, audio preferences, and the `vi`/`en` language choice are
stored in each browser's `localStorage`. Therefore every computer or phone has
its own independent save.

Touch devices receive an on-screen movement joystick plus large Jump and Stomp
buttons. The title screen, world selector, settings dialog, and HUD have
phone-safe layouts for portrait and landscape orientations.
