<script lang="ts">
let count = 0;
const increment = () => {
  count += 1;
  console.log(count);
};
</script>

<button on:click={increment}>
  count is {count}
</button>
