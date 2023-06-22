<script lang="ts">
  import { onMount } from "svelte";

  let command = "";

  let show = false;

  $: if (command[command.length - 1] === " ") {
    command = command.slice(0, command.length - 1);
    command = command + "\u00A0";
  }

  function handleKeydown(event: KeyboardEvent) {
    command += event.key;
  }

  onMount(() => {
    show = true;
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div id="container" class="min-h-full flex justify-center items-center">
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
        <p class="break-all">
          <span class="m-0 p-0 text-amber-400">&gt;&nbsp;</span>{command}<span
            class="w-2 h-6 bg-white inline-block"
          />
        </p>
      </div>
    {:else if !show}
      <p>Loading...</p>
    {/if}
  </div>
</div>
