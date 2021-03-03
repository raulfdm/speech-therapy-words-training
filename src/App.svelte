<script lang="ts">
  import { generateRandomWords } from "./generateRandomWordsTable";

  export async function fetchWords() {
    const words = await fetch("/words.json").then((r) => r.json());
    return generateRandomWords(words.pt);
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
  {#await fetchWords()}
  <p class="loading">Carregando...</p>
  {:then wordTable}
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
  {/await}
</main>

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
  .description,
  .loading {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }

  table,
  .loading {
    margin-top: 3rem;
  }

  table tr td {
    text-align: center;
  }

  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 2em;
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
