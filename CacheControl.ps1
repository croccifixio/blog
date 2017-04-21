# Source for Is-Numeric function: http://stackoverflow.com/a/10939609/6454553
function Is-Numeric ($value) {
  return $value -match "^[\d\.]+$"
}

# Style messages indicating a succesfull operation
function Write-Success ($string) {
  Write-Host "$($string)`n" -ForegroundColor Green -BackgroundColor Black
}

function Login {
  try {
    Write-Host "Login to your Azure account."
    Login-AzureRmAccount -ErrorAction Stop
    Write-Success "Logged in successfully."

  } catch {
    Write-Warning "Login failed."
    Write-Error $_.Exception.Message
    exit
  }
}

function SelectSubscription {
  $subs = Get-AzureRmSubscription
  if ($subs.length -eq 1) { # Select the only subscription
    $selection1 = $subs

  } elseif ($subs.length -gt 1) { # Print the subscriptions found and ask the user to choose one
    $count = 1
    Write-Host "Found the following subscriptions:"
    foreach ($s in $subs) {
      Write-Host "$($count)`) $($s.SubscriptionName)"
      $count++
    }

    do {
      $userInput = Read-Host "Your choice"
    } while (1..$subs.length -notcontains $userInput)

    $SName = $subs[$($userInput-1)].SubscriptionName
    $selection1 = Get-AzureRmSubscription -SubscriptionName $SName | Select-AzureRmSubscription

  } else {
    Write-Warning "Unable to find any subscriptions."
    exit
  }

  Write-Success "Selected the '$($selection1.Subscription.SubscriptionName)' subscription."
}

function SelectStorageAccount {
  $stores = Get-AzureRmStorageAccount
  if ($stores.length -eq 1) { # Select the only storage account
    $RGName = $stores.ResourceGroupName
    $Global:SAName = $stores.StorageAccountName # Used in SelectContainer function
    $selection2 = Set-AzureRmCurrentStorageAccount -ResourceGroupName $RGName -StorageAccountName $SAName # The variable eats up the output of this command which happens to be the StorageAccountName i.e. $SAName == $selection2

  } elseif ($stores.length -gt 1) { # Print the storage accounts found and ask the user to coose one
    $count = 1
    Write-Host "Found the following storage accounts:"
    foreach ($s in $stores) {
      Write-Host "$($count)`) $($s.StorageAccountName) [$($s.ResourceGroupName)]"
      $count++
    }

    do {
      $userInput = Read-Host "Your choice"
    } while (1..$stores.length -notcontains $userInput)
    
    $RGName = $stores[$($userInput-1)].ResourceGroupName
    $SAName = $stores[$($userInput-1)].StorageAccountName
    $selection2 = Set-AzureRmCurrentStorageAccount -ResourceGroupName $RGName -StorageAccountName $SAName # The variable eats up the output of this command which happens to be the StorageAccountName i.e. $SAName == $selection2

  } else {
    Write-Warning "Unable to find any storage accounts on the subscription that you selected."
    exit
  }

  Write-Success "Selected the '$($SAName)' storage account."

  do {
    Write-Host "Please enter the storage account key associated with this account when prompted below."
    $Global:context = New-AzureStorageContext -StorageAccountName $SAName # Used in SetTTL function
    if (!$context) {
      Write-Warning "The key you entered was not accepted`n"
    } else {
      Write-Success "Storage account key accepted."
    }
  } while (!$context)
}

function SelectContainer {
  $containers = Get-AzureStorageContainer
  if ($containers.length -eq 1) { # Select the only storage account
    $selection3 = $containers

  } elseif ($containers.length -gt 1) { # Print the containers found and ask the user to choose one
    $count = 1
    Write-Host "Found the following containers:"
    foreach ($c in $containers) {
      Write-Host "$($count)`) $($c.Name)"
      $count++
    }

    do {
      $userInput = Read-Host "Your choice"
    } while (1..$containers.length -notcontains $userInput)
    
    $Global:CName = $containers[$($userInput-1)].Name # Used in SelectFiles function
    $selection3 = Get-AzureStorageContainer -Name $CName

  } else {
    Write-Host "Something went wrong. Perhaps there are no storage accounts on the subscription that you selected."
  }

  Write-Success "Selected the '$($selection3.Name)' container."
}

function SelectFiles {
  do {
    $retypeQuery = $false 
    do {
      Write-Host "Enter a query to select the files you wish to edit"
      Write-Host "HINTS:"
      Write-Host "- '" -NoNewline
      Write-Host "fonts/*" -ForegroundColor Magenta -BackgroundColor Black -NoNewline
      Write-Host "' will select all files in the fonts folder"
      Write-Host "- '" -NoNewline
      Write-Host "placeholder.jpg" -ForegroundColor Magenta -BackgroundColor Black -NoNewline
      Write-Host "' will select a file in the root directory with that name"
      Write-Host "- '" -NoNewline
      Write-Host "*.png" -ForegroundColor Magenta -BackgroundColor Black -NoNewline
      Write-Host "' will select all PNG files in all directories)"
      $userInput = Read-Host "Your query"
      $Global:found = Get-AzureStorageBlob -Container $CName -Blob $userInput # Used in SetTTL function
      if ($found.length -eq 0) {
        Write-Warning "No files matched your query`n"
      }
    } while ($found.length -eq 0)

    Write-Host "`nThe following files matched your query:"
    $count = 1
    foreach ($f in $found) {
      Write-Host "$($count)`) " -NoNewline
      Write-Host "$($f.Name)" -ForegroundColor Cyan -BackgroundColor Black
      $count++
    }

    Write-Host "`nWould you like to try a different query?"
    Write-Host "1) Yes"
    Write-Host "2) No"
    do {
      $userInput = Read-Host "Your choice"
    } while (1..2 -notcontains $userInput)
    if ($userInput -eq 1) {
      $retypeQuery = $true
    }
  } while ($retypeQuery)
}

function SetTTL {
  do {
    Write-Host "`nEnter the Time-to-Live (TTL) for the files you have selected."
    $userInput = Read-Host "Your TTL"
    if (-Not (Is-Numeric $userInput)) {
      Write-Warning "Please only enter digits.`n"
    }
  } while (-Not (Is-Numeric $userInput))

  try {
    foreach ($f in $found) {
      $blob = Get-AzureStorageBlob -Context $context -Container $CName -Blob $f.Name -ErrorAction Stop
      $blob.ICloudBlob.Properties.CacheControl = "public, max-age=$($userInput)"
      $blob.ICloudBlob.SetProperties()
    }
    Write-Success "$($found.count) files had their TTL set to $($userInput)."
  } catch {
    Write-Warning "Unable to access the files."
    Write-Error $_.Exception.Message
  }
}

Login
SelectSubscription
SelectStorageAccount
SelectContainer
SelectFiles
SetTTL