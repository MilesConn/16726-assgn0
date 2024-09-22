This repo contains my writeups for [16-726 Generative Image
Synthesis](https://learning-image-synthesis.github.io/sp24/)


Most of my writeups had some tweaking but to view them you can run `npm
install` and then `npm dev` (note: I used `pnpm` but any package manager should
do)

To view different writeups navigate to `src/pages/index.astro` and modify

```jsx
const entry = await getEntry("posts", "assgn5")
```

to the post you want. Note the typechecker should enforce valid post titles.
