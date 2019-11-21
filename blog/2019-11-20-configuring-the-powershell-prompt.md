---
date: 2019-11-20
description: The prompt is, depending on how heavily one's workflow involves using CLIs, a potentially frequent occurence in a developer's workflow. It is worth knowing how the prompt can be customised to behave in a way that is more conducive and relevant to a given context.
seo_title: Configuring the PowerShell Prompt
slug: configuring-the-powershell-prompt
title: Configuring the PowerShell Prompt
tags: powershell, git
---

1. ## Creating a PowerShell Profile

  The first step in customising the PowerShell prompt is setting up a profile. This is a file that will be loaded every time you open a new PowerShell console. For those familiar with bash, the concept is similar to a `.bashrc` file.

  Before creating a new profile, it is worthwhile checking if one already exists. This can be confirmed by running the following command:

  ```powershell
  Echo $PROFILE
  ```

  If the above command outputs a path, then we can skip the creation of a profile. If the output is empty, then we will have to create a new profile by openning up a PowerShell console and executing the following command:

  ```powershell
  New-Item -ItemType File -Path $PROFILE -Force
  ```

  This will create a profile and save it to the follwing location: `C:\Users\<user>\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`. This path will also be saved to the `$PROFILE` environment variable.

2. ## Editting the PowerShell Prompt

  The default prompt in Powerhell shows the current working directory and not much else. It looks something like this:

  ```
  PS C:\current\working\directory>
  ```

  One issue with such a prompt occurs that when the current working directory is deeply nested and/or contains long folder names. This can make the prompt stretch to cover the full width of the window or screen. Having to input a command in the shell and have it overflow onto the next line almost immediately is less than ideal.

  ![PowerShell instance](https://cdn.odongo.xyz/images/ps-prompt.gif)

  There are a few ways we could go about dealing with long working directories. We could truncate part of the path or remove the current working directory from the prompt altogether. These solutions might be more compelling for those who find themselves working with deeply nested directories very often.

  However, to provide a more consistent experience, we could leave the path in the prompt as is. Instead we will solve the problem indirectly, by moving the cursor one line down.

  Having a basic idea of what we want our prompt to look like, we can fire up our editor of choice and edit our profile. If we define a `Prompt` function, it will be ran when PowerShell is generating the prompt.

  ```powershell
  function Prompt {
    Write-Host "[$($ExecutionContext.SessionState.Path.CurrentLocation)]" -f DarkCyan
    return "> "
  }
  ```

  After saving your changes, open a new PowerShell console (this can be done by running the command `powershell` in a console that is already open) to view the changes. Our prompt should now appear as follows:

  ```
  [C:\current\working\directory]
  >
  ```

  Moving the cursor onto its own line means that we no longer have to deal with searching for the cursor as we switch between projects or change directories within a single project. The position of the cursor is now always consistent, wether or not the current working directory is long or short.

  In addition to this, it is far less likely that a command we enter into the console will break onto the next line since we have freed up a significant amount of horizontal space.

3. ## Fine-tuning the Prompt

  We could make a few more changes to our prompt to make it, in my opinion, nicer to work with.

  First we will add the name of the current user to the prompt:

  ```powershell
  function Prompt {
    Write-Host "[$($ExecutionContext.SessionState.Path.CurrentLocation)]" -f DarkCyan
    Write-Host "$env:username>" -n -f DarkGreen
    return " "
  }
  ```

  Next we will replace the angled bracket in our prompt with a fancier arrow:

  ```powershell
  function Prompt {
    Write-Host "[$($ExecutionContext.SessionState.Path.CurrentLocation)]" -f DarkCyan
    Write-Host "$env:username" -n -f DarkGreen
    Write-Host " $([char]0x2192)" -n -f DarkGreen
    return " "
  }
  ```

  For the sake of convenience, let's split the above code into functions:

  ```powershell
  function Write-Directory {
    Write-Host "[$($ExecutionContext.SessionState.Path.CurrentLocation)]" -f DarkCyan
  }

  function Write-UserName {
    Write-Host "$env:username" -n -f DarkGreen
  }

  function Write-Arrow {
    Write-Host " $([char]0x2192)" -n -f DarkGreen
  }

  function Prompt {
    Write-Directory
    Write-UserName
    Write-Arrow
    return " "
  }
  ```

  Our prompt now looks like this:

  ```
  [C:\current\working\directory]
  CurrentUser →
  ```

4. ## Showing the Current Git Branch in the Prompt

  The final adjustment we will make is adding the current git branch to the prompt. We will need a function that gets the current git branch and displays it in the prompt if the current working directory is part of a git repository.

  The solution to this comes [courtesy of StackOverflow](https://stackoverflow.com/a/44411205/6454553). It uses different colours to represent different branches (i.e. red for detached, yellow for master, dark green for everything else).

  We can make the following modification to our profile:

  ```powershell
  function Write-GitBranchName {
    try {
      $branch = git rev-parse --abbrev-ref HEAD

      if ($branch -eq "HEAD") {
        $sha = git rev-parse --short HEAD
        Write-Host "($sha)" -n -f Red
      }
      elseif ($branch -eq "master") {
        Write-Host "($branch)" -n -f Yellow
      }
      else {
        Write-Host "($branch)" -n -f DarkGreen
      }
    } catch {
      Write-Host "(no branches yet)" -n -f DarkGreen
    }
  }

  function Write-Directory {
    Write-Host "[$($ExecutionContext.SessionState.Path.CurrentLocation)]" -f DarkCyan
  }

  function Write-UserName {
    Write-Host "$env:username" -n -f DarkGreen
  }

  function Write-Arrow {
    Write-Host " $([char]0x2192)" -n -f DarkGreen
  }

  function Prompt {
    Write-Directory
    if (Test-Path .git) {
      Write-GitBranchName
    }
    else {
      Write-UserName
    }
    Write-Arrow
    return " "
  }
  ```

With all that done, we should now have a prompt that conveys more relevant information that the default one while still managing not to get in our way.

## Footnotes:

The `Write-Host` cmdlet has a few flags that we made use of. The first one is the `-n` or `-NoNewLine` flag, which as the name suggests, instructs the cmdlet not to print a new line character at the end of its output.

The other flag that we utilised was the `-f` or `-ForegroundColor` flag. This flag expects a valid PowerShell color to be passed to it. It will apply this color to the text that it outputs.

To see a full list of available colours, run the following [command from Microsoft's TechNet](https://blogs.technet.microsoft.com/gary/2013/11/20/sample-all-powershell-console-colors/):

```powershell
[enum]::GetValues([System.ConsoleColor]) | % {Write-Host $_ -ForegroundColor $_}
```
