import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [app, listen] = new ChemicalServer();
const port = 3000;

app.use(express.static("public", {
    index: "index.html",
    extensions: ["html"]
}));

app.get("/", (_, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get("/browser", (_, res) => res.sendFile(path.join(__dirname, "public/browser.html")));
app.get("/explore", (_, res) => res.sendFile(path.join(__dirname, "public/explore.html")));
app.get("/settings", (_, res) => res.sendFile(path.join(__dirname, "public/settings.html")));
app.use((req, res, next) => {
    if (req.path.endsWith(".html")) {
        res.redirect("/");
    } else {
        next();
    }
});

app.serveChemical();

async function boot() {
    console.clear();

    const spinner = ora({ text: "Starting GLOSS server...", color: "cyan" }).start();

    try {
        spinner.text = "Building TailwindCSS...";
        await new Promise((resolve, reject) => {
            exec("npx tailwindcss -i ./public/_gloss/css/tw.css -o ./public/_gloss/css/tw.opt.css --minify", (err) => {
                if (err) {
                    spinner.fail(chalk.red("TailwindCSS build failed"));
                    reject(err);
                } else {
                    spinner.succeed(chalk.green("TailwindCSS compiled successfully"));
                    resolve();
                }
            });
        });

        spinner.start("Checking required HTML files...");
        const htmlFiles = ["index.html", "explore.html", "browser.html", "settings.html"];
        for (const file of htmlFiles) {
            const filePath = path.join(__dirname, "public", file);
            if (await fs.pathExists(filePath)) {
                spinner.succeed(chalk.green(`Found: public/${file}`));
            } else {
                spinner.warn(chalk.yellow(`Missing: public/${file}`));
            }
        }

        spinner.start("Scanning for required directories...");
        const directories = [
            "public",
            "public/_gloss/css",
            "public/_gloss/js",
            "public/_gloss/images",
            "public/_gloss/tools"
        ];

        for (const dir of directories) {
            const fullPath = path.join(__dirname, dir);
            if (await fs.pathExists(fullPath)) {
                spinner.succeed(chalk.green(`Found: ${dir}`));
            } else {
                spinner.fail(chalk.red(`Missing: ${dir}`));
            }
        }

        spinner.start("Starting server...");
        listen(port, () => {
            spinner.succeed(chalk.green(`GLOSS server is running at ${chalk.cyan(`http://localhost:${port}`)}`));
        });

    } catch (err) {
        spinner.fail(chalk.red("Startup failed"));
        console.error(err);
    }
}

boot();
