output "static_web_app_url" {
  value = azurerm_static_web_app.swa.default_host_name
}