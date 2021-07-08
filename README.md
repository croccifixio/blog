# Odongo.xyz

This is the source code for [odongo.xyz][1] which is built on [Zola][2].

Feel free to send a [pull request][3] or open an [issue][4] if you notice any typos, wonky rendering issues, etc.

---

This project uses `pnpm`, which can be installed locally by running the following command:

```
npm install --global pnpm
```

---

It also uses a custom build of `zola` at version `0.14.0`. The only customisation that has been made is the addition of a custom theme ([Blackboard Pro](https://github.com/Croccifixio/blackboard-pro)) for syntax highlighting. The executable can be found in the `bin` directory.

<details>

<summary>Adding a custom theme to `zola`</summary>

The following steps are sourced from the [`zola` contributing guide](https://github.com/getzola/zola/blob/master/CONTRIBUTING.md#adding-a-theme).

1. Build the tool that generates the theme dump
   ```bash
   cd components/config
   cargo build --example generate_sublime
   ```
2. Copy your `.tmTheme` file into the `zola/sublime/theme` directory
3. Generate the `all.themedump` file
   ```bash
   cd -
   ./target/debug/examples/generate_sublime themepack sublime/themes/ sublime/themes/all.themedump
   ```
4. Build `zola`
   ```bash
   cargo build --release
   ```

</details>

## Running the Project

**Spin up a local development server**

```
pnpm run start
```

**Build a production artifact**

```
pnpm run build
```

## Deploying the Project

**Install dependencies**

```
pnpm install
```

**Login to Netlify**

```
pnpx netlify login
```

**Deploy to Netlify**

```
pnpm run deploy
```

## License

Copyright &copy; 2016-2020 Emmanuel Odongo. See [LICENSE][5] for details.

[1]: https://odongo.xyz
[2]: https://www.getzola.org/
[3]: https://github.com/Croccifixio/blog/pull/new/main
[4]: https://github.com/Croccifixio/blog/issues/new
[5]: https://github.com/Croccifixio/blog/blob/main/LICENSE
