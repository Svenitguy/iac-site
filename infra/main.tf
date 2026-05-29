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