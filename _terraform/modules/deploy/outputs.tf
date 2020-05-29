output "site_url" {
  description = "The URL of the site"
  value = aws_s3_bucket.bucket_deploy_jekyll.website_endpoint
}

output "access_key_id" {
  description = "AWS_ACCESS_KEY_ID"
  value = aws_iam_access_key.access_key_deploy_jekyll.id
}

# Output the generated secret access key after `apply`
# The value is encrypted by the PGP key above
output "secret_access_key" {
  description = "AWS_SECRET_ACCESS_KEY"
  value = aws_iam_access_key.access_key_deploy_jekyll.encrypted_secret
}
