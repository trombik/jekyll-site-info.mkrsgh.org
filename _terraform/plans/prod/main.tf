provider "aws" {
  region = "ap-northeast-1"
}

variable "fqdn" {
  type    = string
  default = "info.mkrsgh.org"
}

# Create an IAM user for deployment
resource "aws_iam_user" "user_deploy_jekyll" {
  name = "tf-deploy-jekyll"
}

# Create an access key of the user
resource "aws_iam_access_key" "access_key_deploy_jekyll" {
  user = aws_iam_user.user_deploy_jekyll.name
  pgp_key = file("${path.module}/pgp_public_key.b64")
}

resource "aws_iam_user_policy" "iam_policy_deploy_jekyll" {
  name = "tf-iam-policy-deploy-jekyll"
  user = aws_iam_user.user_deploy_jekyll.name
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "${aws_s3_bucket.bucket_deploy_jekyll.arn}/*",
                "${aws_s3_bucket.bucket_deploy_jekyll.arn}"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetAccessPoint",
                "s3:GetAccountPublicAccessBlock",
                "s3:ListAccessPoints",
                "s3:ListJobs",
                "s3:HeadBucket"
            ],
            "Resource": "*"
        }
    ]
}
POLICY
}

# Create a bucket policy (NOT IAM policy!) for the destination bucket
resource "aws_s3_bucket_policy" "policy_deploy_jekyll" {
  bucket = aws_s3_bucket.bucket_deploy_jekyll.bucket
  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "${aws_iam_user.user_deploy_jekyll.arn}"
            },
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": "${aws_s3_bucket.bucket_deploy_jekyll.arn}"
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "${aws_iam_user.user_deploy_jekyll.arn}"
            },
            "Action": [
                "s3:GetObject",
                "s3:DeleteObject",
                "s3:PutObject"
            ],
            "Resource": "${aws_s3_bucket.bucket_deploy_jekyll.arn}/*"
        },
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "${aws_s3_bucket.bucket_deploy_jekyll.arn}/*"
        }
    ]
}
POLICY
}

# Create the destination bucket
resource "aws_s3_bucket" "bucket_deploy_jekyll" {

  # only lowercase alphanumeric characters and hyphens allowed
  bucket = "bucket-${replace(var.fqdn, ".", "-")}"
  acl    = "public-read"
  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}

output "site_url" {
  value = aws_s3_bucket.bucket_deploy_jekyll.website_endpoint
}

output "access_key" {
  value = aws_iam_access_key.access_key_deploy_jekyll.id
}

# Output the generated secret access key after `apply`
# The value is encrypted by the PGP key above
output "secret_access_key" {
  value = aws_iam_access_key.access_key_deploy_jekyll.encrypted_secret
}
