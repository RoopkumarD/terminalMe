<script lang="ts">
  let command = "";
  $: if (command[command.length - 1] === " ") {
    command = command.slice(0, command.length - 1);
    command = command + "\u00A0";
  }
</script>

<div id="container" class="min-h-full flex justify-center items-center">
  <div
    id="terminal"
    class="bg-zinc-950 h-96 w-1/2 font-jetBrain text-white text-xl p-4"
  >
    <div id="content">
      <p><span class="text-amber-400">&gt;</span> Hello Ji mera naam roop</p>
    </div>
    <div id="command" class="">
      <p class="break-all">
        <span class="m-0 p-0 text-amber-400">&gt;&nbsp;</span>{command}<input
          bind:value={command}
          type="text"
          class="m-0 p-0 outline-none z-50 w-2 h-min bg-white text-white"
        />
      </p>
    </div>
  </div>
</div>
