<script lang="ts">
  import { onMount } from "svelte";

  import { generateRandomWords } from "./generateRandomWordsTable";
  import shuffle from "lodash.shuffle";

  let vocabulary;
  let wordTable = [];
  export let languageDisplay = "";

  onMount(async () => {
    vocabulary = await fetch("/words.json").then((r) => r.json());
  });

  export function generateByLang(lang) {
    return () => {
      wordTable = generateRandomWords(vocabulary[lang]);
    };
  }

  export function generatePortuguese() {
    wordTable = generateRandomWords(vocabulary["pt"]);
    languageDisplay = "Português";
  }

  export function generateEnglish() {
    wordTable = generateRandomWords(vocabulary["en"]);
    languageDisplay = "Inglês";
  }

  export function generateMixed() {
    const enVoc = generateRandomWords(vocabulary["en"]);
    const ptVoc = generateRandomWords(vocabulary["pt"]);

    const combined = [
      ...enVoc.slice(0, enVoc.length / 2),
      ...ptVoc.slice(0, ptVoc.length / 2),
    ];

    wordTable = shuffle(combined);
    languageDisplay = "Portugês e Inglês";
  }
</script>

<header>
  <h1>Treinamento Fono</h1>
  <p class="description">
    Treino e percepção dos diferentes tempos de articulação de acordo com o
    comprimento da palavra.
  </p>
</header>

<main>
  <div class="actions">
    <button on:click="{generatePortuguese}">Português</button>
    <button on:click="{generateEnglish}">Inglês</button>
    <button on:click="{generateMixed}">Portugês e Inglês</button>
  </div>
</main>

{#if wordTable.length === 0}
<p class="welcome">Para começar, selecione o idioma das palavras abaixo.</p>
{:else}
<h2>48 palavras em: <i>{languageDisplay}</i></h2>
<table>
  <tbody>
    {#each wordTable as row}
    <tr>
      {#each row as cell}
      <td>{cell}</td>
      {/each}
    </tr>
    {/each}
  </tbody>
</table>
{/if}

<footer>
  <p>
    Para ver a lista completa de todas palavras disponíveis,
    <a href="/words.json">click aqui</a>
  </p>
</footer>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }

  .description {
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 1em;
    text-align: center;
  }

  table,
  .welcome {
    margin-top: 3rem;
  }

  table tr td {
    text-align: center;
  }

  .welcome {
    text-align: center;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 2em;
  }

  .actions {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    h1 {
      font-size: 4em;
    }
  }
</style>
