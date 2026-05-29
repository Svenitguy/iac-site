# IaC Site – Azure Static Web App (Terraform + CI/CD)

![Azure](https://img.shields.io/badge/Azure-Static%20Web%20Apps-blue?logo=microsoftazure)
![Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4?logo=terraform)
![CI/CD](https://img.shields.io/badge/GitHub-Actions-black?logo=githubactions)
![Status](https://img.shields.io/badge/Status-Active-success)

---

## 🚀 Overview

This project is a personal **Cloud Engineering / DevOps learning project** focused on:

- Infrastructure as Code (Terraform)
- Cloud deployment on Microsoft Azure
- CI/CD automation using GitHub Actions
- Fully automated static website deployment

The goal is to deploy a complete web application **without manual Azure Portal configuration after initial setup**.

Every change pushed to the `main` branch automatically triggers a full build and deployment pipeline.

---

## 🌐 Live Application (Demo)

This application is automatically deployed via CI/CD to Azure Static Web Apps.

The environment can be recreated or replaced as part of Infrastructure as Code testing.

---

## 🧱 Architecture

```text
GitHub (repo)
→ GitHub Actions (CI/CD pipeline)
→ Azure Static Web Apps (hosting)
→ End users (browser)
```

---

## 📁 Project Structure

```
iac-site/
│
├── infra/                 # Terraform infrastructure
│   ├── main.tf
│   ├── providers.tf
│   ├── variables.tf
│   └── outputs.tf
│
├── website/               # Static frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docs/
│   └── screenshots/
│       ├── 01-azure-static-web-app-deployment-success.png
│       ├── 02-github-actions-ci-cd-success.png
│       ├── 03-terraform-apply-success.png
│       ├── 04-azure-resource-group-created.png
│       ├── 05-terraform-static-web-app-created.png
│       ├── 06-azure-static-web-app-overview.png
│       ├── 07-github-actions-deploy-success.png
│       ├── 08-azure-static-web-app-live.png
│       └── 09-azure-static-web-app-overview.png
```
---

## 🛠️ Technologies Used

- Microsoft Azure (Static Web Apps)
- Terraform (Infrastructure as Code)
- GitHub Actions (CI/CD)
- HTML, CSS, JavaScript
- Git & GitHub
- VS Code

---

## 🎯 Project Goals

- Implement Infrastructure as Code using Terraform
- Build a real-world CI/CD pipeline
- Fully automate cloud deployment (no manual portal work)
- Learn Azure cloud architecture
- Gain DevOps / Cloud Engineering experience

---

## 📌 Current Status

✅ Fully working end-to-end deployment pipeline

- Terraform infrastructure deployed successfully
- Azure Static Web App running
- GitHub Actions CI/CD active
- Automated deployments on every push to `main`
- Live website publicly accessible

---

## 🚀 Future Improvements

### 🌐 Cloud & Infrastructure
- Add custom domain (`iac.svenitguy.be`)
- Improve Terraform structure (modules)
- Add dev / prod environments
- Implement remote state (Azure Storage backend)

### 🔐 Security & Best Practices
- Improve secret management
- Add role-based access control (RBAC)
- Harden CI/CD pipeline permissions

### 📊 Observability
- Add Azure Monitor / logging
- Add deployment alerts

---

## 📚 Notes

This project is part of a personal journey into **Cloud Engineering, DevOps, and Infrastructure as Code**.

It demonstrates real-world automation using modern cloud tooling and best practices, focusing on repeatable and scalable infrastructure.