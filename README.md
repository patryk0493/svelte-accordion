# 🪗 Svelte Epic Accordion 🪗

## Svelte component inspired by Visual Studio Code

Project is still in beta! <!-- Try demo: [here](https://www.demo.pl) -->

[![npm version](https://badge.fury.io/js/svelte-epic-accordion.svg)](https://badge.fury.io/js/svelte-epic-accordion)
![Release](https://github.com/patryk0493/svelte-epic-accordion/actions/workflows/release.yml/badge.svg)
![Tests](https://github.com/patryk0493/svelte-epic-accordion/actions/workflows/tests.yml/badge.svg)

## 📔 Installation

`npm install -D svelte-epic-accordion`

`pnpm i -D svelte-epic-accordion`

`yarn add -D svelte-epic-accordion`

## ❓ How to use❓

#### Basic setup:

```svelte
<script>
  import Accordion from "svelte-epic-accordion";
</script>

<Accordion let:Section>
  <Section id="one">Section one</Section>
  <Section id="two">Section two</Section>
</Accordion>
```

# ✏️ Examples

```svelte
<script>
  import Accordion from "svelte-epic-accordion";
</script>

<Accordion let:Section>
  <Section id="one">
    <span slot="aside">🚀</span>
    Section one
  </Section>
</Accordion>
```

# 🎯 Goal :

See [TODO list](https://github.com/janosh/svelte-multiselect/pull/217)

## License

MIT
