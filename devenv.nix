{ pkgs, ... }:
{
  packages = with pkgs; [ nodejs_23 ];
  languages.typescript.enable = true;
  dotenv.enable = true;
}
