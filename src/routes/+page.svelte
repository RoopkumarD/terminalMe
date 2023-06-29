<script lang="ts">
  import { onMount } from "svelte";

  let command = "";
  let cli: HTMLInputElement;
  let content: HTMLDivElement;

  let show = false;
  let screen = false;

  const values = [
    {
      name: "whoami.txt",
      type: "text",
      values:
        "I'm currently a student at IITM, doing my BSc degree. I'm living in Pune, Maharashtra, and I'm just trying to learn and create cool stuff!",
    },
    {
      name: "education.txt",
      type: "text",
      values: `Primary and High School:
        City International School -> primary education
        Nowrosjee Wadia -> secondary education

        Current:
        Pursuing BSC degree from IITM
      `,
    },
    {
      name: "email.txt",
      type: "text",
      values: "roopkumards@gmail.com",
    },
    {
      name: "projects",
      type: "directory",
      values: [
        {
          name: "TSTL.txt",
          type: "text",
          values:
            "I've created a browser extension that simplifies sharing text and links between your computer and Android device. This project seamlessly syncs shared content to your Todoist account, allowing for easy management and access across devices. With this extension, you can effortlessly send links and text between your computer and phone, eliminating the need for additional apps or services.",
        },
        {
          name: "terminalMe.txt",
          type: "text",
          values:
            "This is the one you're currently using. I created this out of my love for the terminal.",
        },
      ],
    },
    {
      name: "socials.txt",
      type: "text",
      values: `Here are my social links
        1. GitHub - https://github.com/RoopkumarD
        2. Twitter - https://twitter.com/Roopkd_
        `,
    },
    {
      name: "credits.txt",
      type: "text",
      values: `I am grateful to these amazing individuals for generously sharing their work for free, which has enabled me to create the very thing you are using.
        1. Sveltekit - https://kit.svelte.dev/ 
        2. TailwindCSS - https://tailwindcss.com/
        3. Terminal Colorscheme - https://color.smyck.org/ 
        4. Background - https://www.instagram.com/genji_fj_512/
`,
    },
  ];

  const availableCommands = [
    {
      name: "help",
      whatItdoes: "to check available commands",
    },
    {
      name: "ls",
      whatItdoes: "to show the content of directory",
    },
    {
      name: "cd [directory]",
      whatItdoes: `to move to that specific directory
      Usage: cd social or cd 'My Education'`,
    },
    {
      name: "cd ..",
      whatItdoes: "to move back to parent directory of current directory",
    },
    {
      name: "clear",
      whatItdoes: "to clear the terminal screen",
    },
    {
      name: "cat [txt file]",
      whatItdoes: `to read content of txt file
      Usage: cat twitter.txt`,
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
    span.classList.add("text-folderColor");
    p.classList.add("whitespace-break-spaces");
    p.classList.add("break-all");
    p.textContent = command;
    p.insertBefore(span, p.firstChild);
    content.appendChild(p);
    return;
  }

  function lsCommand() {
    let p = document.createElement("p");
    p.classList.add("text-folderColor");
    let currentDirectoryLastIndex = currentDirectory.length - 1;
    for (let element of currentDirectory) {
      let span = document.createElement("span");
      span.textContent = element.name;

      if (currentDirectory[currentDirectoryLastIndex] !== element) {
        span.classList.add("mr-6");
      }

      if (element.type === "text") {
        span.classList.add("text-textColor");
      }

      p.appendChild(span);
    }
    p.classList.add("break-all");
    content.appendChild(p);
    return;
  }

  function cdCommand() {
    let nameCommand = command.substring(3);
    for (let element of currentDirectory) {
      if (element.name === nameCommand && element.type === "directory") {
        currentDirectory = element.values;
        return;
      }
    }
    let p = document.createElement("p");
    p.textContent = nameCommand + " not found!";
    p.classList.add("text-commandErrorColor");
    p.classList.add("break-all");
    content.appendChild(p);
    return;
  }

  function cdDotCommand(start: directoryArr[]) {
    if (currentDirectory === values) {
      return;
    }

    if (typeof start === "string") {
      return;
    }

    for (let element of start) {
      if (element.values === currentDirectory) {
        currentDirectory = start;
        return;
      }
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
    p.textContent = "command not found: " + command;
    p.classList.add("text-commandErrorColor");
    content.appendChild(p);
    return;
  }

  function catCommand() {
    let nameCat = command.substring(4);
    for (let element of currentDirectory) {
      if (element.name === nameCat && element.type === "text") {
        let p = document.createElement("p");
        p.textContent = element.values;
        p.classList.add("text-textColor");
        // p.classList.add("break-all");
        p.classList.add("whitespace-pre-line");
        content.appendChild(p);
        return;
      }
    }
    let p = document.createElement("p");
    p.textContent = nameCat + " not found";
    p.classList.add("text-commandErrorColor");
    content.appendChild(p);
    return;
  }

  function helpCommand() {
    let div = document.createElement("div");
    for (let element of availableCommands) {
      let p = document.createElement("p");
      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      span1.textContent = element.name;
      span1.classList.add("text-commandColor");
      span2.textContent = "  -> " + element.whatItdoes;
      p.appendChild(span1);
      p.appendChild(span2);
      p.classList.add("whitespace-pre-line");
      div.appendChild(p);
    }
    content.appendChild(div);
    return;
  }

  function cdUsageMistake() {
    let p = document.createElement("p");
    p.textContent = "Usage: cd [directory name]";
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
      } else if (command === "cd") {
        cdUsageMistake();
      } else if (command === "cd ..") {
        cdDotCommand(values);
      } else if (command === "clear") {
        clearCommand();
      } else if (command.substring(0, 4) === "cat ") {
        catCommand();
      } else if (command === "help") {
        helpCommand();
      } else {
        commandNotFound();
      }
      command = "";
    } else {
      cli.focus();
    }
  }

  onMount(() => {
    // if (window.innerWidth > 1024) {
    //   show = true;
    // } else {
    //   screen = true;
    // }
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

<!-- {#if screen == false} -->
<div
  id="container"
  class="bg-[url('/background.webp')] bg-cover h-full flex justify-center items-center"
>
  <div
    id="terminal"
    class="bg-backgroundColor shadow-2xl h-96 w-1/2 overflow-y-auto font-jetBrain text-textColor text-lg p-4"
  >
    {#if show}
      <div id="content" class="m-0 p-0" bind:this={content}>
        <p>
          <span class="text-folderColor">&gt;&nbsp;</span>Hey, this is Roop. Use
          the 'help' command to learn about all the available commands that you
          can use right now.
        </p>
      </div>

      <div id="command" class="">
        <p class="whitespace-break-spaces break-all p-0">
          <!-- Here, input is not input for command but used as inline element -->
          <!-- to display terminal toggle. -->
          <span class="m-0 p-0 text-folderColor">&gt;&nbsp;</span
          >{command}<input class="bg-white outline-none h-6 w-2" readonly />
        </p>
      </div>
    {:else if !show}
      <p>Loading...</p>
    {/if}
  </div>
</div>
<!-- {:else if screen == true} -->
<!--   <div>Please</div> -->
<!-- {/if} -->
