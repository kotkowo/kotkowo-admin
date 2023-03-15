{
  description = "Development environment";

  inputs = {
      nixpkgs = { url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };
      flake-utils = { url = "github:numtide/flake-utils"; };
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        inherit (nixpkgs.lib) optional;
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
          devShell = pkgs.mkShell
          {
            buildInputs =
              (with pkgs; [
                glibcLocales
                nodejs
                inotify-tools
                yarn
                # needed for emacs to unzip elixir-ls
                unzip
              ]) ++ 
              (with pkgs.nodePackages; [
                typescript-language-server
                eslint
              ]);
          };
      }
    );
}
