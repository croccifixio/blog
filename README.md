# Odongo.xyz

This is the source code for [odongo.xyz][1] which is built on [Zola][2].

Feel free to send a [pull request][3] or open an [issue][4] if you notice any typos, wonky rendering issues, etc.

---

This project uses `pnpm`, which can be installed locally by running the following command:

```
npm install --global pnpm
```

---

It also uses a custom build of `zola` at version `0.12.2`. The only customisation that has been made is the addition of a custom theme ([Blackboard Pro](https://github.com/Croccifixio/blackboard-pro)) for syntax highlighting. The executable can be found in the `bin` directory.

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
