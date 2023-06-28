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
          name: "'Inside Me'",
          values: "Don't be uncool", // for file, value is content inside file
          type: "file",
        },
        {
          name: "'dummy folder'",
          values: [], // thus for folder value is things inside folder
          type: "directory",
        },
      ],
      type: "directory",
    },
    {
      name: "Projects",
      values: "None",
      type: "file",
    },
    {
      name: "'Hello JI mera naam roop'",
      values: "None",
      type: "file",
    },
    {
      name: "'I want power'",
      values: [
        {
          name: "'More Power'",
          values: "Kese ?",
          type: "file",
        },
        {
          name: "emerald",
          values: "kaizo",
          type: "file",
        },
        {
          name: "roop",
          values: [
            {
              name: "age",
              values: "19",
              type: "file",
            },
            {
              name: "birth",
              values: "2003",
              type: "file",
            },
          ],
          type: "directory",
        },
        {
          name: "penname",
          values: "rkad",
          type: "file",
        },
      ],
      type: "directory",
    },
  ];

  type directoryArr = Record<string, any>;
  let currentDirectory: directoryArr[] = values;

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
    return;
  }

  function lsCommand() {
    let p = document.createElement("p");
    p.classList.add("text-orange-500");
    let currentDirectoryLastIndex = currentDirectory.length - 1;
    for (let element of currentDirectory) {
      let span = document.createElement("span");
      span.textContent = element.name;

      if (currentDirectory[currentDirectoryLastIndex] !== element) {
        span.classList.add("mr-8");
      }

      if (element.type === "file") {
        span.classList.add("text-white");
      }

      p.appendChild(span);
    }
    content.appendChild(p);
    return;
  }

  function cdCommand() {
    let nameCommand = command.substring(3);
    console.log(nameCommand, command);
    for (let element of currentDirectory) {
      console.log(element.name, nameCommand);
      if (element.name === nameCommand && element.type === "directory") {
        currentDirectory = element.values;
        console.log(currentDirectory);
        return;
      }
    }
    console.log("not found");
    let p = document.createElement("p");
    p.textContent = nameCommand + " not found!";
    p.classList.add("text-red-500");
    p.classList.add("break-all");
    content.appendChild(p);
    return;
  }

  function cdDotCommand(start: directoryArr[]) {
    if (currentDirectory === values) {
      console.log("currentDirectory == values");
      return;
    }

    if (typeof start === "string") {
      console.log("file de diya");
      return;
    }

    for (let element of start) {
      if (element.values === currentDirectory) {
        console.log(element.values, currentDirectory);
        currentDirectory = start;
        return;
      }
      console.log(element);
      cdDotCommand(element.values);
    }

    return;
  }

  function clearCommand() {
    while (content.firstChild) {
      content.firstChild.remove();
    }
  }

  function commandNotFound() {
    let p = document.createElement("p");
    p.textContent = "command not found";
    p.classList.add("text-green-400");
    content.appendChild(p);
    return;
  }

  function catCommand() {
    let nameCat = command.substring(4);
    for (let element of currentDirectory) {
      if (element.name === nameCat && element.type === "file") {
        let p = document.createElement("p");
        p.textContent = element.values;
        p.classList.add("text-white");
        p.classList.add("break-all");
        content.appendChild(p);
        return;
      }
    }
    let p = document.createElement("p");
    p.textContent = "file not found";
    p.classList.add("text-red-500");
    content.appendChild(p);
    return;
  }

  function pressKey(event: KeyboardEvent) {
    if (event.key == "Enter") {
      addCommand();
      if (command === "ls") {
        lsCommand();
      } else if (command.substring(0, 3) === "cd " && command !== "cd ..") {
        cdCommand();
      } else if (command === "cd ..") {
        cdDotCommand(values);
      } else if (command === "clear") {
        clearCommand();
      } else if (command.substring(0, 4) === "cat ") {
        catCommand();
      } else {
        commandNotFound();
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
      <div id="content" class="m-0 p-0" bind:this={content}>
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
