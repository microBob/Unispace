<script lang="ts">
function switchWorkspace(id: string) {
  browser.runtime.sendMessage(`Switch to workspace ${id}`);
}
</script>

<main>
    <button on:click={()=>switchWorkspace("52a20840-93f9-4f07-8db7-d11b6c8ef3de")}>First</button>
    <button on:click={()=>switchWorkspace("d299525b-c025-4394-85fb-469a09ba9ab5")}>Second</button>
    <button on:click={()=>switchWorkspace("6c6c7ef0-91fc-4c0e-971c-a4915a8e0b40")}>Third</button>
</main>

<style>
</style>
