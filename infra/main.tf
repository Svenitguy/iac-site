############################################
# Random suffix (voor unieke naming)
############################################
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

############################################
# Resource Group
############################################
resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Static Web App (frontend)
############################################
resource "azurerm_static_web_app" "swa" {
  name                = var.app_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku_tier = "Free"
  sku_size = "Free"

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Log Analytics Workspace
############################################
resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-iac-site-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Application Insights
############################################
resource "azurerm_application_insights" "appi" {
  name                = "appi-iac-site-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Storage Account (required for Function App)
############################################
resource "azurerm_storage_account" "funcsa" {
  name = "safunc${random_string.suffix.result}"

  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Service Plan (Consumption / serverless)
############################################
resource "azurerm_service_plan" "plan" {
  name                = "plan-iac-site-${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  os_type  = "Linux"
  sku_name = "Y1"

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

############################################
# Azure Function App (API layer)
############################################
resource "azurerm_linux_function_app" "func" {
  name                = "func-iac-site-${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  service_plan_id = azurerm_service_plan.plan.id

  storage_account_name       = azurerm_storage_account.funcsa.name
  storage_account_access_key = azurerm_storage_account.funcsa.primary_access_key

  site_config {
    application_stack {
      node_version = "18"
    }
  }

  app_settings = {
    FUNCTIONS_WORKER_RUNTIME       = "node"
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.appi.instrumentation_key
  }

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}