provider "aws" {
  region = "ap-northeast-1"
}

module "deploy" {
  source = "../../modules/deploy"
  fqdn = "info.mkrsgh.org"
  pgp_file = "${path.module}/pgp_public_key.b64"
  force_destroy_bucket = true
}
