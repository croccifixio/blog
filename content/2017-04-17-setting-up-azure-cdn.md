+++
date = 2017-04-17
title = "Setting Up Azure&nbsp;CDN"
path = "setting-up-azure-cdn"
[taxonomy]
tags = ["azure"]
[extra]
description = [
  "This guide goes through the process of setting up Azure CDN on a custom domain. A function is triggered when content is uploaded to Azure storage, and sets the time-to-live of the uploads based on what container they are uploaded to."
]
seo_title = "Setting Up Azure CDN"
+++

There is no lack of CDN providers available for ensuring that the static content of your website is delivered. A good number of them offer very competitive prices per GB of traffic. However, this low pricing is typically paired with a relatively high minimum payment, which must be met monthly or annually depending on the provider.

The case described above is ideal if your needs exceed the bandwidth that is covered by the minimum payment (in general the price/GB decreases the more bandwidth you consume).

If we are expecting relatively low traffic but would still like to make use of a CDN, the more cost effective approach would be to find a provider that offers pay-as-you-go billing. Two major candidates that meet this criterion are Amazon CloudFront and Microsoft Azure. Since I already had an Azure account from some previous tinkering with web apps, I opted to go the Microsoft route. The steps are documented below:

1. ## Create a CDN profile

  Assuming you have created an Azure account, sign in to your [Azure portal][1].

  On the navigation pane on the left of the portal, click through the following options: {{ flow(steps=["New", "Web&nbsp;+&nbsp;Mobile", "CDN"]) }}. This will open up a pane for setting up your CDN profile.

  ![Azure Navigation pane](https://cdn.odongo.xyz/images/navigation_pane.png)

  Give your CDN profile a __Name__. Create a new __Resource Group__ and provide a name for it. The tooltip next to the __Resource group location__ explains that the region you select has no impact on the availability of your resources on the network, so pick whichever you prefer.

  The __Pricing tier__ will depend on what your requirements are (see the [features comparison table][2]). Pick one of the Verizon pricing tiers if you want support for custom domains with HTTPS.

  Check the __Pin to dashboard__ checkbox to make it easy to find our CDN profile later. Click on {{ flow(steps=["Create"]) }} to create the CDN profile.

  ![Creating a CDN profile in Azure](https://cdn.odongo.xyz/images/create_cdn_profile.png)

2. ## Implement Azure Storage

  Create a function app by navigating to the setup pane from the navigation pane: {{ flow(steps=["New", "Compute", "Function&nbsp;App"]) }}.

  You may use an existing resource group. You also have the choice to rename the storage account by clicking on {{ flow(steps=["Storage&nbsp;account", "Create&nbsp;New"]) }}.

  ![Creating a storage account in Azure](https://cdn.odongo.xyz/images/create_function_app.png)

  To keep your resources organised, it is a good idea to create folders for different resources, e.g., a <span class="input">fonts</span> folder for web fonts or an <span class="input">images</span> folder for images. Click on {{ flow(steps=["All&nbsp;resources"]) }} on the navigation pane and open up the storage account that you just created. Click on {{ flow(steps=["Blobs", "+&nbsp;Container"]) }} and after naming the container, set the __Access type__ to <span class="input">Blob</span>.

  ![Creating a container in Azure](https://cdn.odongo.xyz/images/create_container1.png)
  ![Creating a container in Azure](https://cdn.odongo.xyz/images/create_container2.png)

  To upload a file to a container, click on the container name and then on {{ flow(steps=["Upload</span>. This allows you to select local files for upload (see [Microsoft Azure Storage Explorer][3] for managing Azure storage outside of the web portal). But before you start uploading files...

3. ## Write cache header functions

  Open up the function app that was created in the previous step (under the {{ flow(steps=["All&nbsp;resources</span> tab in the navigation pane it has the type __App Service__).

  Click on the {{ flow(steps=["+"]) }} sign next to {{ flow(steps=["Functions"]) }} and then on {{ flow(steps=["Custom&nbsp;function"]) }} &rarr; {{ flow(steps=["BlobTrigger-CSharp"]) }}.

  ![Creating a function in Azure](https://cdn.odongo.xyz/images/create_function.png)

  Name your function. For the __Path__, enter the container name followed by <span class="input">/{name}</span> (if you have a container called <span class="input">images</span> in your storage account, then the path should be <span class="input">images/{name}</span>).

  Under __Storage account connection__, click on {{ flow(steps=["new"]) }} and choose the storage account.

  After clicking {{ flow(steps=["Create"]) }}, the __run.csx__ file is opened. Replace the default code with the snippet below:

  ```cs
  #r "Microsoft.WindowsAzure.Storage"
  using Microsoft.WindowsAzure.Storage.Blob;
  public static void Run(ICloudBlob myBlob, TraceWriter log)
  {
     if (myBlob.Properties.CacheControl == null)
     {
       myBlob.Properties.CacheControl = "public, max-age=_^8640000$_;
       myBlob.SetProperties();
       log.Info("Attempting to set Cache Control header...");
     }
     else
     {
       log.Info("CONFIRMATION: Cache Control header for '" + myBlob.Name + "' has been set to '" +  myBlob.Properties.CacheControl + "'");
     }
  }
  ```

  Having the max-age equal to <span class="input">8640000</span> seconds will set the TTL to 100 days. You can change this to any value above <span class="input">300</span>. Hit {{ flow(steps=["Save"]) }}.

  From now on, whenever you upload a file to the container that the function monitors, the function will trigger, setting the time-to-live of the uploaded file. The function logs can be viewed by clicking on {{ flow(steps=["Logs"]) }} or the {{ flow(steps=["^"]) }} next to it.

  ![A function in the Azure function app](https://cdn.odongo.xyz/images/function.png)

4. ## Set up a CDN endpoint

  Open up your CDN profile and click on {{ flow(steps=["+&nbsp;Endpoint"]) }} to add a CDN endpoint.

  Choose a __Name__ for your endpoint. Set the __Origin type__ to <span class="input">Storage</span> and select the storage account you created as the __Origin hostname__. After doing this, the __Origin host header__ will fill in automatically.

  The __Protocols__ that you decide to permit will depend on your requirements. You may also leave them as they are and change them later.

  ![Creating an endpoint in Azure](https://cdn.odongo.xyz/images/create_endpoint.png)

  It may take up to 90 minutes for the endpoint to start functioning as intended. Once it is ready, files in your storage account will be accessible at <span class="input break-word pr-0">https://\_^endpoint_name$\_.azureedge.net/\_^container_name$\_/\_^file_name$\_</span>.

5. ## Configure your custom domain

  Open the endpoint and click on {{ flow(steps=["+&nbsp;Custom&nbsp;domain"]) }}.

  Create a CNAME record for <span class="input">cdn.yoursite.com</span> that points to the value indicated in the __Endpoint hostname__ field. Once the DNS record propagates (this can be checked using [DNS Checker][4]), enter <span class="input">cdn.yoursite.com</span> into the __Custom hostname__ field and click {{ flow(steps=["Add"]) }}.
  ![Adding a custom domain in Azure](https://cdn.odongo.xyz/images/custom_domain.png)

  By default, custom HTTPS is disabled. If you would like to enable it click on the custom domain and set __Custom domain HTTPS__ to <span class="input">On</span>. After hitting {{ flow(steps=["Apply"]) }}, an email will be sent to the email address associated with your domain. Verify your ownership of the domain by clicking the link in the email and completing the application.

  After setting up your custom domain, your files should be available at <span class="input break-word pr-0">cdn.yoursite.com/\_^container\_name$\_/\_^file_name$_</span>. The protocol (HTTP or HTTPS) depends on which protocols you permitted while setting up the endpoint, as well as whether your domain has SSL configured.

<h2 class="subtitle">Footnotes:</h2>

1. ### Content Security Policy

  If you make use of CSP and have strict enough policies, you may need to add any custom subdomain that you created to your list of allowed sources. For instance, if you are planning to use your CDN to serve images you would add a policy similar to the following: <span class="input break-word">img-src: https://cdn.yoursite.com</span>.

2. ### Viewing CDN content in a local dev environment

  CORS (Cross Origin Resource Sharing) can prove to be an issue while testing your site in a local environment. A simple way to get around this is by disabling the restriction on cross origin HTTP requests within the browser. This can be done with the help of a browser extension such as <a href="https://chrome.google.com/webstore/detail/cors-toggle/jioikioepegflmdnbocfhgmpmopmjkim">CORS Toggle</a> (Chrome Web Store) or <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/">CORS Everywhere</a> (Firefox Add-ons). Both of these extensions add a button to the browser that can be used to toggle CORS.

<h2 class="subtitle">Sources:</h2>

<ul class="u-list references">
  <li><a href="https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint">Getting started with Azure CDN</a></li>
  <li><a href="https://docs.microsoft.com/en-us/azure/cdn/cdn-map-content-to-custom-domain">Map Azure CDN content to a custom domain</a></li>
  <li><a href="https://docs.microsoft.com/en-us/azure/cdn/cdn-manage-expiration-of-blob-content">Manage expiration of Azure Storage blobs in Azure CDN</a></li>
  <li><a href="https://azure.microsoft.com/en-us/blog/best-practices-for-the-windows-azure-content-delivery-network/">Best Practices for the Windows Azure CDN</a></li>
</ul>

[1]: https://portal.azure.com
[2]: https://docs.microsoft.com/en-us/azure/cdn/cdn-overview
[3]: http://storageexplorer.com/
[4]: https://dnschecker.org/
