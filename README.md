# gabezurita.github.io with Tailwind CSS Templates

## Introduction

This repository hosts my website built using plain HTML, Tailwind CSS, and a few Vanilla JS scripts. Additionally, Alpine JS is used for interactive features like sliders, video, and image popups.

---

## Features

- **Responsive Design**: Built with Tailwind CSS for seamless responsiveness.
- **Dark/Light Mode**: Easily toggle between themes.
- **Interactive Elements**: Powered by Alpine JS for sliders and modals.

---

## Directory Structure

The directory structure for this project is as follows:

```bash
|-- src
|    |-- css
|       |-- All CSS Files
|    |-- js
|       |-- All JS Files
|    |-- images
|       |-- All Images
|    |-- partials
|       |-- HTML Common Sections Like Header, Footer, etc.
|    |-- index.html and All HTML Pages
|
|-- All Config Files

```

To customize the website, modify the files in the `src` folder.

---

## Development Workflow

### Pre-commit Hooks

The project uses pre-commit hooks to ensure code quality before each commit. These hooks:

- Run Prettier for consistent code formatting
- Run ESLint to catch JavaScript issues
- Run tests to ensure nothing is broken

To set up pre-commit hooks:

```bash
npm install husky --save-dev
npm run prepare
```

The hooks are configured in the `.husky` directory and will run automatically before each commit.

### Automated Dependency Updates

This project uses GitHub's Dependabot to automatically keep dependencies up to date. The configuration in `.github/dependabot.yml` includes:

- Weekly checks for npm package updates
- Weekly checks for GitHub Actions updates
- Automatic pull request creation for updates
- Automatic merging of minor and patch updates if:
  - All CI tests pass
  - No conflicts exist
  - No custom conditions are violated

Pull requests for major version updates require manual review.

### Continuous Integration

GitHub Actions workflows automatically:

1. Run tests and linting on all pull requests
2. Build the project to ensure it compiles correctly
3. Auto-merge Dependabot updates when all checks pass
4. Deploy to GitHub Pages on successful merges to main

You can view the workflow configurations in `.github/workflows/`.

---

## Getting Started

### Prerequisites

Ensure **Node.js** is installed on your machine. Without it, the installation and build commands won’t work.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gabezurita/gabezurita.github.io.git
   ```

2. Navigate into the project folder:

   ```bash
   cd gabezurita.github.io
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Development

To run the project locally:

```bash
npm run start
```

This will launch the website on [localhost:3000](http://localhost:3000), where you can view live changes as you edit the files.

---

## Deployment

The website is automatically deployed using GitHub Actions whenever changes are pushed to the main branch. The deployment process:

1. Automatically builds the project using:

   ```bash
   npm run build
   ```

2. Deploys the built site to GitHub Pages

To set up deployment:

1. Ensure your repository has GitHub Pages enabled under **Settings > Pages**
2. Select "GitHub Actions" as the deployment source
3. Push your changes to the main branch - the site will be automatically built and deployed

You can monitor the deployment status in the "Actions" tab of your repository.

The site will be accessible at <https://gabezurita.github.io/gabezurita.github.io> and <https://gabo.online> once deployed.

---

## Dark-Light Mode Settings

### Light Mode

To enable light mode by default:

1. Add the `light` class to the `<html>` tag.
2. Remove the theme switcher code from the JavaScript file.
3. Delete the theme switcher button from the HTML header.

### Dark Mode

To enable dark mode by default:

1. Add the `dark` class to the `<html>` tag.
2. Follow the same steps as above to remove the theme switcher.

---

## Contributing

Contributions are welcome! Please ensure:

1. Your code passes all pre-commit hooks
2. All tests are passing
3. The build completes successfully
4. You've tested your changes locally

Submit a pull request and it will be reviewed as soon as possible.

---

## License

This project is based on templates from UIdeck. Please ensure you comply with their licensing terms.

---

## Support

If you have any questions or run into issues:

- Open an issue in this repository.
- Reach out to [me](https://github.com/gabezurita) directly.

Happy coding!
