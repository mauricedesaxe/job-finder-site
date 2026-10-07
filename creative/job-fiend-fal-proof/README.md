# Job Fiend fal CLI image proof

This waving pose uses the approved [site mascot](../../public/images/job-fiend-3d.webp) as its identity and rendering reference. It is an asset study. The live page still uses the approved illustrations.

The run used genmedia 0.7.0 with `fal-ai/nano-banana/edit` on 2026-10-07. The quoted price was $0.0398 for one image. [Fal's API page](https://fal.ai/models/fal-ai/nano-banana/edit/api) supplied the input fields because the CLI's compact schema returned null and its OpenAPI expansion failed. Both responses are saved here.

`spec.json` records the prompt, settings, reference role, and uploaded reference URL. `models.json` and `pricing.json` are the live discovery and price snapshots. `result.json` is the CLI response, `generated.webp` is its downloaded image, and `manifest.json` records the request ID and SHA-256 hashes for the reference, response, and output.
