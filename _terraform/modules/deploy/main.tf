# XXX a hack to workaround an issue where terraform does not allow dynamic
# variables in default values of input variables
locals {
  __fqdn_dash  = replace(var.fqdn, ".", "-")
  __user_name = var.user_name == "" ? join("", [var.resource_prefix, "user-", local.__fqdn_dash]) : var.user_name
  __iam_policy_name = var.iam_policy_name == "" ? join("", [var.resource_prefix, "policy-", local.__fqdn_dash]) : var.iam_policy_name
  __bucket_name = var.bucket_name == "" ? join("", ["bucket-", replace(var.fqdn, ".", "-")]) : var.bucket_name
  __pgp_file = var.pgp_file == "" ? "${path.cwd}/pgp_public_key.b64" : var.pgp_file
}

# Create an IAM user for deployment
resource "aws_iam_user" "user_deploy_jekyll" {
  name = local.__user_name
}

# Create an access key of the user
resource "aws_iam_access_key" "access_key_deploy_jekyll" {
  user = aws_iam_user.user_deploy_jekyll.name
  pgp_key = file(local.__pgp_file)
}

resource "aws_iam_user_policy" "iam_policy_deploy_jekyll" {
  name = local.__iam_policy_name
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

  # only lowercase alphanumeric characters and dashes allowed
  bucket = local.__bucket_name
  acl = "public-read"
  force_destroy = var.force_destroy_bucket
  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}
