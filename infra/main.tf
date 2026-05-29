resource "azurerm_resource_group" "rg" {
  name     = "rg-iac-site-test"
  location = "West Europe"

  tags = {
    managed_by = "terraform"
    environment = "test"
    project = "iac-site"
  }
}

resource "azurerm_static_web_app" "swa" {
  name                = "swa-iac-site-test"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku_tier = "Free"
  sku_size = "Free"

  tags = {
    managed_by = "terraform"
    environment = "test"
    project = "iac-site"
  }
}