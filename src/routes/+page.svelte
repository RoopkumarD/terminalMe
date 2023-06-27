<script lang="ts">
  import { onMount } from "svelte";

  let command = "";
  let cli: HTMLInputElement;
  let content: HTMLDivElement;

  let show = false;

  let values = [
    {
      name: "Me",
      values: [
        // values means inside that thing
        {
          name: "Inside Me",
          values: "Don't be uncool", // for file, value is content inside file
          type: "file",
        },
        {
          name: "dummy folder",
          values: [], // thus for folder value is things inside folder
          type: "directory",
        },
      ],
      type: "directory",
    },
    {
      name: "Projects",
      type: "directory",
    },
    {
      name: "Hello JI mera naam roop",
      type: "directory",
    },
  ];
  let currentDirectory = values;

  /*
   Here, i don't have to worrry about server not able to interpret
   document method, as until show == true which will be when onMounted
   the component, thus these function will be only available when the
   component is Mounted.
  */

  function addCommand() {
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.textContent = "> ";
    span.classList.add("text-amber-400");
    p.classList.add("whitespace-break-spaces");
    p.classList.add("break-all");
    p.textContent = command;
    p.insertBefore(span, p.firstChild);
    content.appendChild(p);
  }

  function spaceInString(str: string) {
    for (let i of str) {
      if (i === " ") {
        return true;
      }
    }
    return false;
  }

  function lsCommand() {
    let p = document.createElement("p");
    p.classList.add("text-orange-500");
    p.classList.add("whitespace-break-spaces");
    p.classList.add("break-all");
    for (let element of values) {
      let span = document.createElement("span");
      let check = spaceInString(element.name);
      if (check === true) {
        span.textContent = "'" + element.name + "'" + "   ";
      } else if (check === false) {
        span.textContent = element.name + "   ";
      }
      p.appendChild(span);
    }
    content.appendChild(p);
  }

  function dirAvailable(name: string) {
    for (let element of currentDirectory) {
      if (element.name === name && element.type === "directory") {
        return true;
      }
    }
    return false;
  }

  function cdCommand() {
    let check = dirAvailable(command.substring(3));
    if (check === true) {
      currentDirectory = command.substring(3);
    } else if (check === false) {
    }
  }

  function pressKey(event: KeyboardEvent) {
    if (event.key == "Enter") {
      addCommand();
      if (command === "ls") {
        lsCommand();
      } else if (command === "cd") {
        cdCommand();
      }
      command = "";
    } else {
      cli.focus();
    }
  }

  onMount(() => {
    show = true;
  });
</script>

<svelte:window on:keydown={pressKey} />

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
      <div id="content" bind:this={content}>
        <p>
          <span class="text-amber-400">&gt;&nbsp;</span>Hello Ji mera naam roop
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
