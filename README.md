# Live site url

[Live demo](https://newsletter-section-sepia.vercel.app/)

## Starter project

## Step by step guide for creating a new project based on this one

### Local setup

- Duplicate this `starter` directory and rename it to your `<project_name>`
- Update the `name` field in the `package.json` file to your `<project_name>`
- Update the `description` field in the `package.json` file to your `<project_description>`

### Git setup

- Remove the `git remote` pointing to this repository

```bash
git remote remove origin
```

- Create a new repository in your GitHub account `https://github.com/TheFernande?tab=repositories`
- Add the new repository as the `origin` remote

```bash
git remote add origin <your_repository_url>
```

### Development

- Install the dependencies

```bash
yarn
```

- Start the development server

```bash
yarn run dev
```

### Publish

- Build the project -> Always test the build before publishing 🤓

```bash
yarn run build
```

- Publish the project either with the following commands or with VsCode's GUI

```bash
git add .
git commit -m "<commit_message>"
git push origin main
```

## Useful commands

- Reload VsCode window

```bash
Cmd + Shift + P -> Reload Window
```
