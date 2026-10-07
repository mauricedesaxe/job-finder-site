# Job Fiend product video

![Poster frame](poster.png)

[Watch the 12-second video](renders/job-fiend-promo.mp4)

This silent 1920 × 1080 video uses the walking and booking mascots from the Job Fiend landing page. The copy comes from the same page. It is a product proof for the pinned `product-launch-video` workflow in Lazar harness.

The editable HyperFrames project is here: `BRIEF.md`, `STORYBOARD.md`, `frame.md`, `index.html`, `hyperframes.json`, `compositions/frames/`, `assets/`, and `capture/`. The two frames use local assets and DM Sans fonts, so the project can be checked and rendered without fetching brand media. The font license is in `assets/fonts/OFL.txt`.

To validate and render with the pinned harness release, set `HARNESS` to a Lazar harness checkout containing `skills/hyperframes/scripts/plugin-cli.mjs`, then run from this directory:

```sh
node "$HARNESS/skills/hyperframes/scripts/plugin-cli.mjs" lint
node "$HARNESS/skills/hyperframes/scripts/plugin-cli.mjs" check --snapshots
node "$HARNESS/skills/hyperframes/scripts/plugin-cli.mjs" render --skill=product-launch-video --quality delivery --output renders/job-fiend-promo.mp4
```

The checked render is 12 seconds at 30 fps, H.264, with no audio. The product site UI is unchanged by this directory.
