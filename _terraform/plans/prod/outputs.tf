output "site_url" {
  description = "The URL of the site"
  value = module.deploy.site_url
}

output "access_key_id" {
  description = "AWS_ACCESS_KEY_ID"
  value = module.deploy.access_key_id
}

# Output the generated secret access key after `apply`
# The value is encrypted by the PGP key above
output "secret_access_key" {
  description = "AWS_SECRET_ACCESS_KEY"
  value = module.deploy.secret_access_key
}
