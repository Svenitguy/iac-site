resource "azurerm_resource_group" "rg" {
  name     = var.rg_name
  location = var.location

  tags = {
    managed_by  = "terraform"
    environment = var.environment
    project     = var.project_name
  }
}

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

resource "azurerm_log_analytics_workspace" "law" {
  name                = "law-iac-site-test"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = {
    managed_by = "terraform"
    environment = "test"
    project = "iac-site"
  }
}

resource "azurerm_application_insights" "appi" {
  name                = "appi-iac-site-test"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  workspace_id        = azurerm_log_analytics_workspace.law.id
  application_type    = "web"

  tags = {
    managed_by = "terraform"
    environment = "test"
    project = "iac-site"
  }
}