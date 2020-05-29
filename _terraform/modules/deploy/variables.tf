variable "region" {
  default = "ap-northeast-1"
  description = "AWS region name to deploy"
}

variable "fqdn" {
  type    = string
  description = "FQDN of the site. Used to name resources"
}

variable "resource_prefix" {
  type = string
  description = "Prefix string of various resource name"
  default = "tf-"
}

variable "pgp_file" {
  type = string
  description = "Path to `base64`-encoded PGP key file. Default is $PWD/pgp_public_key.b64"
  default = ""
}

variable "bucket_name" {
  type = string
  description = "bucket name"
  default = ""
}

variable "user_name" {
  type = string
  description = "IAM user name to deploy"
  default = ""
}

variable "iam_policy_name" {
  type = string
  description = "IAM policy to create"
  default = ""
}

variable "force_destroy_bucket" {
  type = bool
  description = "destroy the bucket even if the bucket is not empty"
  default = false
}
