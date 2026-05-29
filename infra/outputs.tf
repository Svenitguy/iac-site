output "static_web_app_url" {
  value = azurerm_static_web_app.swa.default_host_name
}

output "application_insights_connection_string" {
  value     = azurerm_application_insights.appi.connection_string
  sensitive = true
}