<script lang="ts">
  import { onMount } from "svelte";

  let command = "";
  let cli: HTMLInputElement;

  let show = false;

  onMount(() => {
    show = true;
  });
</script>

<svelte:window
  on:keydown={() => {
    cli.focus();
  }}
/>

<input
  type="text"
  class="h-0 w-0 opacity-0 absolute top-0"
  bind:value={command}
  bind:this={cli}
/>

<div id="container" class="h-full flex justify-center items-center">
  <div
    id="terminal"
    class="bg-zinc-950 h-96 w-1/2 overflow-y-auto font-jetBrain text-white text-xl p-4"
  >
    {#if show}
      <div id="content">
        <p>
          <span class="text-amber-400">&gt;</span> Hello Ji mera naam roop
        </p>
      </div>

      <div id="command" class="">
        <p class="whitespace-break-spaces break-all p-0">
          <!-- Here, input is not input for command but used as inline element -->
          <!-- to display terminal toggle. -->
          <span class="m-0 p-0 text-amber-400">&gt;&nbsp;</span>{command}<input
            class="bg-white outline-none h-6 w-2"
            readonly
          />
        </p>
      </div>
    {:else if !show}
      <p>Loading...</p>
    {/if}
  </div>
</div>
