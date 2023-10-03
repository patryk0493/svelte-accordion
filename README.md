# Svelte Accordion component

## Svelte component inspired by Visual Studio Code

Project is still in alpha! Try demo: [here](https://www.demo.pl)

## Installation

`npm install -D svelte-epic-accordion`

`pnpm i -D svelte-epic-accordion`

`yarn add -D svelte-epic-accordion`

## How to use?

```js
<script>
  import Accordion from "svelte-epic-accordion";
</script>

<Accordion let:Section>
	<Section id='one'>
		Section one
	</Section>
	<Section id='two'>
		Section two
	</Section>
</Accordion>
```

# TODO:

- [x] create the component
- [x] try changesets
- [x] try github actions
- [x] TS typings
- build ONLY with rollup
- try automate release to npm
- docusaurus
- styling
- aside slot
- vitest

## License

MIT
