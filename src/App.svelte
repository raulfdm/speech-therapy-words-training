<script lang="ts">
  import { generateRandomWords } from "./generateRandomWordsTable";

  export const wordTable = generateRandomWords();
</script>

<main>
  <h1>Treinamento Fono</h1>
  <p>
    Treino e percepção dos diferentes tempos de articulação de acordo com o
    comprimento da palavra.
  </p>

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
</main>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
  p {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }

  table {
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
