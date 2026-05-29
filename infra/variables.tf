variable "rg_name" {
  description = "Name of the resource group"
  type        = string
  default     = "rg-iac-site-test"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "West Europe"
}

variable "app_name" {
  description = "Name of the Static Web App"
  type        = string
  default     = "swa-iac-site-test"
}

variable "environment" {
  description = "Deployment environment (dev/test/prod)"
  type        = string
  default     = "test"
}

variable "project_name" {
  description = "Project name tag"
  type        = string
  default     = "iac-site"
}